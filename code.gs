function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('나의 성장 체크리스트')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function saveData(userInfo, checkedItems) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Log');
  
  // 데이터가 없으면 종료
  if (checkedItems.length === 0) return "체크된 항목이 없습니다.";

  // 각 체크 항목마다 행을 추가하여 저장
  const rows = checkedItems.map(item => [
    userInfo.date,
    userInfo.classGroup,
    userInfo.number,
    userInfo.name,
    item.category,
    item.task
  ]);
  
  sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, 6).setValues(rows);
  
  return `${userInfo.name} 학생의 기록이 저장되었습니다!`;
}
