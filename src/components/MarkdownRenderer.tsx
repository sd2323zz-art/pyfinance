"use client";

function renderMarkdown(text: string): string {
  if (!text) return "";

  const lines = text.split("\n");
  const tableStartIdx = lines.findIndex((l) => l.trim().startsWith("|"));

  if (tableStartIdx >= 0) {
    let tableEndIdx = tableStartIdx;
    for (let i = tableStartIdx; i < lines.length; i++) {
      if (lines[i].trim().startsWith("|")) tableEndIdx = i;
      else if (i > tableStartIdx) break;
    }

    const beforeTable = lines.slice(0, tableStartIdx).join("\n");
    const tableLines = lines.slice(tableStartIdx, tableEndIdx + 1);
    const afterTable = lines.slice(tableEndIdx + 1).join("\n");

    if (tableLines.length >= 3) {
      const headers = tableLines[0].split("|").filter(Boolean).map((h) => h.trim());
      const rows = tableLines.slice(2).map((r) =>
        r.split("|").filter(Boolean).map((c) => c.trim())
      );

      let tableHtml =
        '<div style="overflow-x:auto;margin:20px 0"><table style="width:100%;border-collapse:collapse;font-size:13.5px"><thead><tr>';
      headers.forEach(
        (h) =>
          (tableHtml += `<th style="text-align:left;padding:10px 14px;background:#222d42;color:#6ba3ff;font-weight:600;border-bottom:2px solid #4f8fff;font-size:12.5px;letter-spacing:0.5px">${h}</th>`)
      );
      tableHtml += "</tr></thead><tbody>";
      rows.forEach((r) => {
        tableHtml += "<tr>";
        r.forEach(
          (c) =>
            (tableHtml += `<td style="padding:9px 14px;border-bottom:1px solid #2a3550;color:#8896b3">${c.replace(
              /`([^`]+)`/g,
              '<code style="font-family:JetBrains Mono,monospace;font-size:13px;background:#222d42;color:#34d399;padding:2px 7px;border-radius:4px;border:1px solid #2a3550">$1</code>'
            )}</td>`)
        );
        tableHtml += "</tr>";
      });
      tableHtml += "</tbody></table></div>";

      return renderMarkdown(beforeTable) + tableHtml + renderMarkdown(afterTable);
    }
  }

  let html = text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#6ba3ff;font-weight:700">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`([^`]+)`/g,
      '<code style="font-family:JetBrains Mono,monospace;font-size:13px;background:#222d42;color:#34d399;padding:2px 7px;border-radius:4px;border:1px solid #2a3550">$1</code>'
    )
    .replace(
      /^> (.+)$/gm,
      '<blockquote style="border-left:3px solid #4f8fff;padding:10px 16px;margin:16px 0;background:rgba(79,143,255,0.15);border-radius:0 8px 8px 0;font-size:14.5px;color:#8896b3;font-style:italic">$1</blockquote>'
    )
    .replace(
      /^• (.+)$/gm,
      '<div style="padding:4px 0 4px 20px;position:relative"><span style="position:absolute;left:4px;color:#4f8fff">•</span>$1</div>'
    )
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");

  return `<p>${html}</p>`;
}

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div
      style={{ fontSize: "15.5px", lineHeight: 1.85, color: "#e8ecf4" }}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
}
