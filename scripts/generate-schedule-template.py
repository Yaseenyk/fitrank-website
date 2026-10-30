"""Builds public/templates/employee-schedule-template.xlsx, the free Excel template
offered at /tools/employee-schedule-template-excel/.

Sheets: Instructions, Shifts (codes, times, hours), Weekly (7-day grid, one row per
employee, hours and shift counts by formula) and Monthly (31-day grid driven by a
month-start date). Requires openpyxl:

    python scripts/generate-schedule-template.py
"""

from pathlib import Path

from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

ROOT = Path(__file__).resolve().parent.parent
TARGET = ROOT / "public" / "templates" / "employee-schedule-template.xlsx"

INK = "1C1A33"
PRIMARY = "6551F0"
LINE = "E3E0F2"
WEEKEND = "F5F3FB"

HEAD_FONT = Font(name="Calibri", bold=True, color="FFFFFF", size=11)
HEAD_FILL = PatternFill("solid", fgColor=PRIMARY)
TITLE_FONT = Font(name="Calibri", bold=True, size=16, color=INK)
NOTE_FONT = Font(name="Calibri", italic=True, size=10, color="6B6987")
BOLD = Font(name="Calibri", bold=True, color=INK)
THIN = Side(style="thin", color=LINE)
BOX = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)
CENTER = Alignment(horizontal="center", vertical="center")
WEEKEND_FILL = PatternFill("solid", fgColor=WEEKEND)

# Shift codes live in Shifts!A5:A10 (hours in E5:E10); the grids' formulas point there.
SHIFTS = [
    ("M", "Morning", "06:00", "14:00"),
    ("D", "Day", "09:00", "17:00"),
    ("E", "Evening", "14:00", "22:00"),
    ("N", "Night", "22:00", "06:00"),
    ("OFF", "Day off", "", ""),
    ("L", "Leave", "", ""),
]
SHIFT_CODES = "Shifts!$A$5:$A$10"
SHIFT_HOURS = "Shifts!$E$5:$E$10"
EMPLOYEES = [f"Employee {i}" for i in range(1, 9)]
# Example week for the Weekly sheet (Monday to Sunday): editable, nothing hidden.
EXAMPLE_WEEK = [
    ["M", "M", "M", "M", "M", "OFF", "OFF"],
    ["D", "D", "D", "OFF", "OFF", "D", "D"],
    ["E", "E", "OFF", "OFF", "E", "E", "E"],
    ["N", "N", "N", "N", "OFF", "OFF", "OFF"],
    ["OFF", "OFF", "M", "M", "M", "M", "M"],
    ["D", "OFF", "OFF", "D", "D", "D", "D"],
    ["OFF", "E", "E", "E", "E", "OFF", "OFF"],
    ["OFF", "OFF", "OFF", "N", "N", "N", "N"],
]
DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]


def header(ws, row, col, text, width=None):
    c = ws.cell(row=row, column=col, value=text)
    c.font = HEAD_FONT
    c.fill = HEAD_FILL
    c.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    c.border = BOX
    if width:
        ws.column_dimensions[get_column_letter(col)].width = width
    return c


def shift_validation(ws):
    codes = ",".join(s[0] for s in SHIFTS)
    dv = DataValidation(type="list", formula1=f'"{codes}"', allow_blank=True)
    dv.error = "Pick a shift code from the Shifts sheet, or leave the cell empty."
    dv.errorTitle = "Unknown shift code"
    ws.add_data_validation(dv)
    return dv


def instructions(wb):
    ws = wb.active
    ws.title = "Instructions"
    ws.column_dimensions["A"].width = 110
    lines = [
        ("Employee schedule template", TITLE_FONT),
        ("Free weekly and monthly staff schedule template. From FitRank: fitrank.streamerosai.com/tools/employee-schedule-template-excel/", NOTE_FONT),
        ("", None),
        ("How to use it", BOLD),
        ("1. Shifts sheet: set your own shift codes, names and start and end times. Hours per shift are worked out for you, including night shifts that cross midnight.", None),
        ("2. Weekly sheet: type one shift code per employee per day, from the drop-down or by hand. Hours, shift counts and days off update by formula.", None),
        ("3. Monthly sheet: type the month's first day in B2 (for example 2026-11-01). Day names and the 29th to 31st follow the month. One code per employee per day.", None),
        ("4. Add employees by inserting rows above the Total row, so the totals and coverage counts keep covering everyone.", None),
        ("5. Print: each grid is set to fit one landscape page wide. Save a copy per week or per month.", None),
        ("", None),
        ("What the formulas check", BOLD),
        ("- Hours per employee for the week or month, from the shift codes and the Shifts sheet.", None),
        ("- Coverage: how many people hold each shift on each day, so an empty shift shows before the week starts.", None),
        ("- Days off per employee (OFF, leave and blank days).", None),
        ("", None),
        ("What it does not do", BOLD),
        ("A spreadsheet records a schedule; it does not choose one. It will not pick who should take an open shift, check skills, or explain a choice.", None),
        ("FitRank ranks your people for open tasks with a probability and a reason for each, and a manager makes every final call: fitrank.streamerosai.com", None),
    ]
    for i, (text, font) in enumerate(lines, start=1):
        c = ws.cell(row=i, column=1, value=text)
        if font:
            c.font = font
        c.alignment = Alignment(wrap_text=True, vertical="top")
    ws.sheet_view.showGridLines = False


def shifts(wb):
    ws = wb.create_sheet("Shifts")
    ws["A1"] = "Shift codes"
    ws["A1"].font = TITLE_FONT
    ws["A2"] = "Edit codes and times here (times as text, 24-hour, e.g. 22:00). Hours are worked out; a shift that ends after midnight is handled."
    ws["A2"].font = NOTE_FONT
    for col, (text, width) in enumerate([("Code", 10), ("Shift", 16), ("Start", 10), ("End", 10), ("Hours", 10)], start=1):
        header(ws, 4, col, text, width)
    for r, (code, name, start, end) in enumerate(SHIFTS, start=5):
        ws.cell(row=r, column=1, value=code).alignment = CENTER
        ws.cell(row=r, column=2, value=name)
        ws.cell(row=r, column=3, value=start).alignment = CENTER
        ws.cell(row=r, column=4, value=end).alignment = CENTER
        # Hours between two clock times typed as text; 0 for a day off or leave.
        h = ws.cell(row=r, column=5, value=f'=IF(OR(C{r}="",D{r}=""),0,MOD(TIMEVALUE(D{r})-TIMEVALUE(C{r}),1)*24)')
        h.number_format = "0.0"
        h.alignment = CENTER
        for col in range(1, 6):
            ws.cell(row=r, column=col).border = BOX
    ws.freeze_panes = "A5"


def grid(ws, day_labels, first_day_col, employees, example=None):
    """Employees down, days across, then Hours, Shifts and Days off, a Total row and coverage rows."""
    head_row = 4
    header(ws, head_row, 1, "Employee", 22)
    n = len(day_labels)
    last_day_col = first_day_col + n - 1
    for i, label in enumerate(day_labels):
        header(ws, head_row, first_day_col + i, label, 7)
    hours_col, count_col, off_col = last_day_col + 1, last_day_col + 2, last_day_col + 3
    header(ws, head_row, hours_col, "Hours", 9)
    header(ws, head_row, count_col, "Shifts", 9)
    header(ws, head_row, off_col, "Days off", 10)

    dv = shift_validation(ws)
    first_emp = head_row + 1
    a, b = get_column_letter(first_day_col), get_column_letter(last_day_col)
    for r, name in enumerate(employees, start=first_emp):
        ws.cell(row=r, column=1, value=name).border = BOX
        row_example = example[r - first_emp] if example else []
        for i in range(n):
            c = ws.cell(row=r, column=first_day_col + i)
            if i < len(row_example):
                c.value = row_example[i]
            c.alignment = CENTER
            c.border = BOX
            dv.add(c)
        rng = f"{a}{r}:{b}{r}"
        h = ws.cell(row=r, column=hours_col, value=f"=SUMPRODUCT(COUNTIF({rng},{SHIFT_CODES})*{SHIFT_HOURS})")
        h.number_format = "0.0"
        cnt = ws.cell(row=r, column=count_col, value=f'=COUNTA({rng})-COUNTIF({rng},"OFF")-COUNTIF({rng},"L")')
        off = ws.cell(row=r, column=off_col, value=f'=COUNTIF({rng},"OFF")+COUNTIF({rng},"L")+COUNTBLANK({rng})')
        for c in (h, cnt, off):
            c.alignment = CENTER
            c.border = BOX
    last_emp = first_emp + len(employees) - 1

    total_row = last_emp + 1
    t = ws.cell(row=total_row, column=1, value="Total (insert employees above this row)")
    t.font = BOLD
    t.border = BOX
    for col in (hours_col, count_col, off_col):
        L = get_column_letter(col)
        c = ws.cell(row=total_row, column=col, value=f"=SUM({L}{first_emp}:{L}{last_emp})")
        c.font = BOLD
        c.alignment = CENTER
        c.border = BOX
        if col == hours_col:
            c.number_format = "0.0"

    cov_head = total_row + 2
    ws.cell(row=cov_head, column=1, value="Coverage: people per shift per day").font = BOLD
    working = [s for s in SHIFTS if s[0] not in ("OFF", "L")]
    for k, (code, name, _, _) in enumerate(working):
        r = cov_head + 1 + k
        ws.cell(row=r, column=1, value=f"{name} ({code})").border = BOX
        for i in range(n):
            L = get_column_letter(first_day_col + i)
            c = ws.cell(row=r, column=first_day_col + i, value=f'=COUNTIF({L}{first_emp}:{L}{last_emp},"{code}")')
            c.alignment = CENTER
            c.border = BOX
    ws.freeze_panes = ws.cell(row=first_emp, column=first_day_col)
    ws.sheet_view.showGridLines = False
    ws.page_setup.orientation = "landscape"
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 0
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.print_title_rows = f"{head_row}:{head_row}"
    return first_emp, last_emp


def weekly(wb):
    ws = wb.create_sheet("Weekly")
    ws["A1"] = "Weekly employee schedule"
    ws["A1"].font = TITLE_FONT
    ws["A2"] = "Week starting:"
    ws["A2"].font = NOTE_FONT
    ws["B2"] = "2026-11-02"
    ws["B2"].font = BOLD
    ws["B2"].alignment = Alignment(horizontal="left")
    ws["D2"] = "One shift code per person per day (see the Shifts sheet). Hours, shift counts and coverage update by formula."
    ws["D2"].font = NOTE_FONT
    first_emp, last_emp = grid(ws, DAYS, 2, EMPLOYEES, example=EXAMPLE_WEEK)
    for r in range(first_emp, last_emp + 1):
        for col in (7, 8):  # Saturday and Sunday
            ws.cell(row=r, column=col).fill = WEEKEND_FILL


def monthly(wb):
    ws = wb.create_sheet("Monthly")
    ws["A1"] = "Monthly employee schedule"
    ws["A1"].font = TITLE_FONT
    ws["A2"] = "Month starts on:"
    ws["A2"].font = NOTE_FONT
    ws["B2"] = "2026-11-01"
    ws["B2"].font = BOLD
    ws["B2"].alignment = Alignment(horizontal="left")
    ws["D2"] = "Type the month's first day in B2. Day names follow; days past the end of the month show blank."
    ws["D2"].font = NOTE_FONT
    n = 31
    first_day_col = 2
    first_emp, last_emp = grid(ws, [str(d) for d in range(1, n + 1)], first_day_col, EMPLOYEES)
    # Header cells show "Mon\n1"; days that fall in the next month go blank.
    for i in range(n):
        col = first_day_col + i
        c = ws.cell(row=4, column=col)
        c.value = f'=IF(MONTH(DATEVALUE($B$2)+{i})<>MONTH(DATEVALUE($B$2)),"",TEXT(DATEVALUE($B$2)+{i},"ddd")&CHAR(10)&{i + 1})'
        ws.column_dimensions[get_column_letter(col)].width = 5.5
    ws.row_dimensions[4].height = 32


def main():
    wb = Workbook()
    instructions(wb)
    shifts(wb)
    weekly(wb)
    monthly(wb)
    TARGET.parent.mkdir(parents=True, exist_ok=True)
    wb.save(TARGET)
    print(f"wrote {TARGET.relative_to(ROOT)} ({TARGET.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
