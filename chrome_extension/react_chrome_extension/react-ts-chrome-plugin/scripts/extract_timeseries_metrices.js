let extractTableData = (tableSelector) => {
  const table = document.querySelector(tableSelector);
  const tableData = [];
  if (table) {
    const rows = table.querySelectorAll('tbody > tr');
    for (const row of rows) {
      const firstColumnCell = row.querySelector('td:first-child');
      if (firstColumnCell) {
        let value = firstColumnCell.textContent.trim().replace(/\s+/g, ' ');
        const originalValue = value;
        const hasPlusOrMinus = value.endsWith('+') || value.endsWith('-');
        if (hasPlusOrMinus) {
          value = value.slice(0, -1).trim();
        }
        if (hasPlusOrMinus) {
          tableData.push({
            "name": value,
            "displayName": value,
            "aliases": [
              originalValue.replace(/[+-]$/, "-"),
              originalValue.replace(/[+-]$/, "+")
            ]
          });
        } else {
          tableData.push({
            "name": value,
            "displayName": value
          });
        }
      }
    }
  }
  return JSON.stringify(tableData, null, 2);
}

// Example usage with the provided table selector:
const tableSelector = '#cash-flow > div.responsive-holder.fill-card-width > table';
const jsonData = extractTableData(tableSelector);

console.log(jsonData)