<?php
// ============================================================
//  ai-analysis.php
//  Receives business form data → calls OpenAI → returns report
//  POST /backend/ai-analysis.php
// ============================================================

require_once __DIR__ . '/config.php';

set_cors_headers($allowed_origins);

// Only POST allowed
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(false, null, 'Only POST requests are allowed.', 405);
}

// ---------- Read & validate input ----------
$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);

if (!$body) {
    json_response(false, null, 'Invalid JSON body.', 400);
}

$required = ['ownerName', 'businessName', 'businessType', 'city', 'challenges'];
foreach ($required as $field) {
    if (empty($body[$field])) {
        json_response(false, null, "Field '$field' is required.", 422);
    }
}

$ownerName     = trim(strip_tags($body['ownerName']));
$businessName  = trim(strip_tags($body['businessName']));
$businessType  = trim(strip_tags($body['businessType']));
$city          = trim(strip_tags($body['city']));
$challenges    = is_array($body['challenges']) ? $body['challenges'] : [];
$monthlyRev    = trim(strip_tags($body['monthlyRevenue'] ?? 'Not specified'));
$description   = trim(strip_tags($body['description']   ?? ''));
$phone         = trim(strip_tags($body['phone']         ?? ''));

// Map challenge IDs to human-readable text
$challengeMap = [
    'no_website'   => 'No website or online presence',
    'low_sales'    => 'Low sales and revenue',
    'no_customers' => 'Not getting new customers',
    'competition'  => 'High local competition',
    'no_social'    => 'No social media presence',
    'no_ads'       => 'Does not know how to advertise',
    'inventory'    => 'Inventory management issues',
    'branding'     => 'Poor branding and identity',
];

$challengeTexts = array_map(
    fn($id) => $challengeMap[$id] ?? $id,
    $challenges
);
$challengesList = implode(', ', $challengeTexts);

// ---------- Build OpenAI prompt ----------
$systemPrompt = <<<PROMPT
You are an expert digital marketing strategist and business consultant specializing in Indian SMEs (small and medium businesses). 
You analyze business information and generate highly personalized, actionable digital growth reports in a mix of simple English and Hindi (Hinglish).
Always respond with valid JSON only — no markdown, no extra text.
PROMPT;

$userPrompt = <<<PROMPT
Analyze this Indian business and generate a detailed digital growth report.

Business Information:
- Owner Name: $ownerName
- Business Name: $businessName
- Business Type: $businessType
- City: $city
- Monthly Revenue: $monthlyRev
- Main Challenges: $challengesList
- Additional Info: $description

Generate a JSON response in this exact structure:
{
  "title": "Report title (business-specific)",
  "insight": "2-3 sentence market insight in Hinglish about this specific business type and city",
  "recommendations": [
    {
      "icon": "emoji",
      "title": "Recommendation title",
      "desc": "Detailed 2-3 sentence explanation in Hinglish with specific numbers/ROI estimates",
      "priority": "High|Medium|Low"
    }
  ],
  "monthlyBudget": "₹X,XXX – ₹X,XXX",
  "expectedRevenue": "₹X,XXX – ₹X,XXX additional per month",
  "quickWins": ["3-4 quick action items they can do this week"],
  "competitor_insight": "One sentence about what competitors in this category are doing digitally"
}

Provide exactly 4 recommendations, each tailored to the specific business type and challenges mentioned.
PROMPT;

// ---------- Call OpenAI API ----------
$payload = json_encode([
    'model'       => OPENAI_MODEL,
    'messages'    => [
        ['role' => 'system', 'content' => $systemPrompt],
        ['role' => 'user',   'content' => $userPrompt],
    ],
    'temperature' => 0.7,
    'max_tokens'  => 1200,
]);

$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . OPENAI_API_KEY,
    ],
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response   = curl_exec($ch);
$httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError  = curl_error($ch);
curl_close($ch);

if ($curlError) {
    json_response(false, null, 'Network error: ' . $curlError, 500);
}

$openaiResponse = json_decode($response, true);

if ($httpStatus !== 200 || empty($openaiResponse['choices'][0]['message']['content'])) {
    $errMsg = $openaiResponse['error']['message'] ?? 'OpenAI API call failed.';
    json_response(false, null, $errMsg, 500);
}

// ---------- Parse AI response ----------
$aiContent = $openaiResponse['choices'][0]['message']['content'];

// Strip markdown code fences if present
$aiContent = preg_replace('/^```(?:json)?\s*/i', '', trim($aiContent));
$aiContent = preg_replace('/\s*```$/i', '', $aiContent);

$report = json_decode($aiContent, true);

if (!$report) {
    // Fallback: return raw text so frontend can at least show something
    json_response(false, ['raw' => $aiContent], 'AI returned unexpected format.', 500);
}

// ---------- Log to DB (optional — won't fail if DB is down) ----------
try {
    $db  = get_db();
    $sql = 'INSERT INTO ai_analysis_logs
              (owner_name, business_name, business_type, city, phone, challenges, report_json, created_at)
            VALUES
              (:owner, :biz, :type, :city, :phone, :challenges, :report, NOW())';
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':owner'     => $ownerName,
        ':biz'       => $businessName,
        ':type'      => $businessType,
        ':city'      => $city,
        ':phone'     => $phone,
        ':challenges'=> $challengesList,
        ':report'    => json_encode($report, JSON_UNESCAPED_UNICODE),
    ]);
} catch (\Throwable $e) {
    // DB logging failure should not block the response
    error_log('JhaTech DB log error: ' . $e->getMessage());
}

// ---------- Return report ----------
json_response(true, $report, 'Report generated successfully.');
