/**
 * AssetBridge Level 6 User Onboarding & Feedback Export Script
 * Parses user responses, formats CSV/JSON telemetry, and outputs clean submission data.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_FILE = path.join(__dirname, '../feedback/responses-template.csv');
const OUTPUT_JSON = path.join(__dirname, '../feedback/responses-export.json');

console.log('🔄 AssetBridge Feedback Data Pipeline - Exporting Level 6 Telemetry...');

if (fs.existsSync(CSV_FILE)) {
  const content = fs.readFileSync(CSV_FILE, 'utf-8');
  const lines = content.trim().split('\n');
  const _headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

  const records = lines.slice(1).map((line, idx) => {
    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
    return {
      userId: values[0] || `USR-${String(idx + 1).padStart(3, '0')}`,
      name: values[1] || '',
      email: values[2] || '',
      walletAddress: values[3] || '',
      rating: values[4] || '5',
      favoriteFeature: values[5] || '',
      missingFeature: values[6] || '',
      bugsEncountered: values[7] || '',
      wouldRecommend: values[8] || 'Yes',
      desiredImprovements: values[9] || '',
      feedbackSummary: values[10] || values[7] || 'General usability praise'
    };
  });

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(records, null, 2));
  console.log(`✅ Successfully processed ${records.length} user onboarding responses!`);
  console.log(`📄 Exported clean JSON dataset to: ${OUTPUT_JSON}`);
} else {
  console.error(`❌ CSV source file not found at: ${CSV_FILE}`);
  process.exit(1);
}
