export function formatExplanation(text) {
  if (!text) return '';
  // Escape basic HTML to avoid injection, allowing simple tags later
  const escapeHtml = (str) => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  let safe = escapeHtml(text);

  const codeBlocks = [];

  safe = safe.replace(/```([a-zA-Z0-9#+.-]*)\r?\n([\s\S]*?)```/g, (_m, lang, code) => {
    const normalizedLang = (lang || '').toLowerCase();
    const isCSharp = normalizedLang === 'csharp' || normalizedLang === 'cs';

    const blockHtml = isCSharp
      ? `<div class="inline-code-block"><span class="inline-code-lang">C#</span><pre class="code-display"><code>${code}</code></pre></div>`
      : `<pre class="code-display"><code>${code}</code></pre>`;

    const token = `@@CODEBLOCK_${codeBlocks.length}@@`;
    codeBlocks.push(blockHtml);
    return token;
  });

  // Bold markers **text**
  safe = safe.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Inline code `code`
  safe = safe.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  // Line breaks
  safe = safe.replace(/\n/g, '<br/>');

  safe = safe.replace(/@@CODEBLOCK_(\d+)@@/g, (_m, i) => codeBlocks[Number(i)] || '');

  return safe;
}
