export function jsonToCsv(items) {
  const header = Object.keys(items[0]);
  const headerString = header.join(",");
  // handle null or undefined values here
  const replacer = (key, value) => value ?? "";
  const rowItems = items.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(",")
  );
  // join header and body, and break into separate lines
  const csv = [headerString, ...rowItems].join("\r\n");
  return csv;
}
