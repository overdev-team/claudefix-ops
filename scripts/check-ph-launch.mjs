// CLAUDEFIX is scheduled on Product Hunt for 2026-09-29 00:01 PDT (07:01 UTC).
const launchUrl = 'https://www.producthunt.com/posts/claudefix';
const siteUrl = 'https://claudefix.store/en/';
const attempts = process.argv.includes('--once') ? 1 : 20;
const pauseMs = 3 * 60 * 1000;
const report = [];

for (let attempt = 1; attempt <= attempts; attempt++) {
  try {
    const response = await fetch(launchUrl, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; CLAUDEFIX launch check)' }, signal: AbortSignal.timeout(20_000) });
    const html = await response.text();
    report.push(`${new Date().toISOString()} attempt ${attempt}: HTTP ${response.status}`);
    if (response.ok && html.includes('CLAUDEFIX') && html.includes('claudefix.store')) {
      const site = await fetch(siteUrl, { signal: AbortSignal.timeout(20_000) });
      if (!site.ok) throw new Error(`Site returned HTTP ${site.status}`);
      const summary = `CLAUDEFIX launch is live: ${response.url}\nSite: ${siteUrl} (HTTP ${site.status})`;
      console.log(summary);
      if (process.env.GITHUB_STEP_SUMMARY) {
        const { appendFile } = await import('node:fs/promises');
        await appendFile(process.env.GITHUB_STEP_SUMMARY, `## Product Hunt launch check\n\n${summary}\n`);
      }
      process.exit(0);
    }
  } catch (error) {
    report.push(`${new Date().toISOString()} attempt ${attempt}: ${error.message}`);
  }
  if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, pauseMs));
}
console.error(report.join('\n'));
throw new Error('Product Hunt launch URL did not become publicly available');
