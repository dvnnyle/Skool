export function formatExplanation(text) {
  if (!text) return '';
  // Escape basic HTML to avoid injection, allowing simple tags later
  const escapeHtml = (str) => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  let safe = escapeHtml(text);

  // Convert fenced code blocks for C# to <pre><code>
  safe = safe.replace(/```csharp\n([\s\S]*?)```/g, (_m, code) => {
    return `<div class="code-snippet-card"><div class="code-header">C#</div><pre class="code-display"><code>${code}</code></pre></div>`;
  });
  // Convert generic fenced code blocks
  safe = safe.replace(/```\n([\s\S]*?)```/g, (_m, code) => {
    return `<pre class="code-display"><code>${code}</code></pre>`;
  });
  // Bold markers **text**
  safe = safe.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Inline code `code`
  safe = safe.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Convert markdown-like list blocks to HTML lists
  const convertListBlocks = (input) => {
    const lines = input.split(/\r?\n/);
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      // Unordered list block (- or *)
      if (/^\s*[-*]\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
          i++;
        }
        out.push('<ul>' + items.map(li => `<li>${li}</li>`).join('') + '</ul>');
        continue;
      }
      // Ordered list block (1. 2. ...)
      if (/^\s*\d+\.\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
          i++;
        }
        out.push('<ol>' + items.map(li => `<li>${li}</li>`).join('') + '</ol>');
        continue;
      }
      // Normal line: keep as-is
      out.push(line);
      i++;
    }
    return out.join('\n');
  };

  safe = convertListBlocks(safe);
  // Line breaks
  // Avoid converting all line breaks to <br/> to reduce visual noise.

  return safe;
}
