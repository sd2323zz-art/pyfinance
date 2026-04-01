export interface CodeExercise {
  type: "code_exercise";
  instruction: string;
  starterCode: string;
  hint: string;
}

export interface CodeDisplay {
  type: "code_display";
  code: string;
  note?: string;
}

export interface ContentSection {
  type: "content";
  body: string;
}

export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface QuizSection {
  type: "quiz";
  question: string;
  options: QuizOption[];
  explanation: string;
}

export type Section = ContentSection | CodeDisplay | CodeExercise | QuizSection;

export interface Lesson {
  id: string;
  day: string;
  stage: number;
  title: string;
  sections: Section[];
}

export const LESSONS: Lesson[] = [
  // ===== 階段一：Python 基礎（Day 1-3）=====
  {
    id: "intro",
    day: "Day 1",
    stage: 1,
    title: "Python 是什麼？為什麼銀行需要它？",
    sections: [
      {
        type: "content",
        body: `在數位金融的世界裡，Python 不是用來「寫軟體」的，而是用來**回答問題**的。

想像你是數金部門的 MA，主管丟給你一份有 50 萬筆信用卡交易紀錄的 CSV 檔，問你：

> 「過去半年，哪個年齡層的客戶流失率最高？」

你要怎麼做？用 Excel 開 50 萬筆資料？它可能直接當掉。

用 Python，三行程式碼就搞定：`,
      },
      {
        type: "code_display",
        code: `import pandas as pd

df = pd.read_csv("信用卡交易.csv")
df.groupby("年齡層")["是否流失"].mean().sort_values()`,
        note: "先看看就好，這段程式碼在第二階段你就會完全理解了。",
      },
      {
        type: "content",
        body: `所以學 Python 的目標不是成為工程師，而是：

• 能用程式快速處理大量數據
• 能做出視覺化圖表輔助決策
• 面試時展現「我有數據思維」

接下來的兩週，我們會從最基本的概念開始，一步步帶你走到能獨立做出一份數據分析報告。

不用擔心，每一步都有範例可以直接執行，你只需要動手改改看、試試看就好。`,
      },
    ],
  },
  {
    id: "variables",
    day: "Day 1",
    stage: 1,
    title: "變數與資料型態",
    sections: [
      {
        type: "content",
        body: `**變數**就像是一個有標籤的盒子，你可以把東西放進去，之後用標籤找到它。

在金融場景裡，變數可能是：一個客戶的名字、一筆交易的金額、一個利率。`,
      },
      {
        type: "code_exercise",
        instruction:
          "試試看：建立三個變數，分別存客戶名稱、存款金額、年利率，然後算出一年後的利息。",
        starterCode: `# 建立變數
customer = "王小明"
deposit = 1000000    # 存款金額（整數 int）
rate = 0.015         # 年利率（浮點數 float）

# 計算利息
interest = deposit * rate

# 印出結果
print(f"{customer} 的年利息是 {interest} 元")`,
        hint: "直接按「執行」看看結果，然後試著改改數字！",
      },
      {
        type: "content",
        body: `看到了嗎？Python 的四種基本型態在金融裡到處都是：

| 型態 | 英文 | 範例 | 金融用途 |
|------|------|------|---------|
| 字串 | str | \`"王小明"\` | 客戶姓名、分行名稱 |
| 整數 | int | \`1000000\` | 交易筆數、客戶人數 |
| 浮點數 | float | \`0.015\` | 利率、報酬率 |
| 布林 | bool | \`True\` | 是否為 VIP、是否違約 |`,
      },
      {
        type: "code_exercise",
        instruction:
          "現在換你來：建立一個客戶的完整資料，包含姓名、年齡、存款金額、是否為 VIP，然後全部印出來。",
        starterCode: `# 請試著修改下方的值，換成你想要的資料
name = "陳小華"       # ← 改成別的名字試試
age = 28              # ← 改成別的年齡
balance = 1500000.0   # ← 改成別的金額
is_vip = False        # ← 改成 True 看看

# 印出客戶資料
print(f"姓名：{name}")
print(f"年齡：{age}")
print(f"餘額：{balance}")
print(f"VIP：{is_vip}")`,
        hint: '先直接按「執行」看結果，然後試著把名字、金額改成別的值再執行一次。字串要用引號包起來，布林值只有 True 或 False。',
      },
    ],
  },
  {
    id: "lists-dicts",
    day: "Day 2",
    stage: 1,
    title: "List 與 Dict — 管理多筆資料",
    sections: [
      {
        type: "content",
        body: `一個變數只能存一筆資料。但銀行每天有幾萬筆交易，怎麼辦？

**List（列表）** 就像一排編號的抽屜：`,
      },
      {
        type: "code_exercise",
        instruction: "用 list 存五位客戶的存款金額，然後算出平均存款。",
        starterCode: `# 五位客戶的存款金額
deposits = [500000, 1200000, 350000, 8000000, 750000]

# 用 len() 算有幾位客戶
count = len(deposits)
print(f"客戶數：{count}")

# 用 sum() 算總額，再除以人數得平均
average = sum(deposits) / count
print(f"平均存款：{average:,.0f} 元")

# 用 max() 和 min() 找最大最小
print(f"最高存款：{max(deposits):,.0f} 元")
print(f"最低存款：{min(deposits):,.0f} 元")`,
        hint: "直接執行看結果，注意 :,.0f 是千分位格式化的寫法。",
      },
      {
        type: "content",
        body: `**Dict（字典）** 更強大，它用「key: value」的方式存資料，就像一份客戶檔案：`,
      },
      {
        type: "code_exercise",
        instruction: "建立一個客戶的完整檔案，然後印出特定資訊。",
        starterCode: `# 用字典存一位客戶的完整資料
customer = {
    "name": "林小美",
    "age": 32,
    "account_type": "數位帳戶",
    "balance": 2500000,
    "is_vip": True
}

# 用 key 取出特定資料
print(f"客戶姓名：{customer['name']}")
print(f"帳戶類型：{customer['account_type']}")
print(f"帳戶餘額：{customer['balance']:,.0f} 元")

# 試試看：加一個新的 key
customer["credit_score"] = 780
print(f"信用分數：{customer['credit_score']}")`,
        hint: "字典的取值用 dict['key'] 的方式。你可以隨時新增 key-value。",
      },
      {
        type: "quiz",
        question:
          '在銀行的數據分析中，如果要存「一位客戶的多項資料」（姓名、餘額、是否 VIP），最適合用什麼資料結構？',
        options: [
          { text: "List（列表）", correct: false },
          { text: "Dict（字典）", correct: true },
          { text: "單獨的變數", correct: false },
          { text: "Tuple（元組）", correct: false },
        ],
        explanation:
          "Dict 用 key-value 的方式可以清楚地標記每筆資料的意義（例如 'name': '王小明'），比 list 的純數字索引更直覺、更不容易搞混。",
      },
    ],
  },
  {
    id: "conditions-loops",
    day: "Day 3",
    stage: 1,
    title: "條件判斷與迴圈 — 自動化處理",
    sections: [
      {
        type: "content",
        body: `銀行裡最常見的邏輯就是「如果...就...」：

> 如果客戶存款超過 300 萬 → VIP
> 如果交易金額異常 → 發送警告
> 如果連續三個月沒交易 → 標記為休眠帳戶

這就是 **if / elif / else**：`,
      },
      {
        type: "code_exercise",
        instruction:
          "寫一個客戶分級的程式：根據存款金額自動判定客戶等級。",
        starterCode: `balance = 2500000  # 試著改這個數字看看

if balance >= 10000000:
    level = "鑽石級"
elif balance >= 3000000:
    level = "白金級"
elif balance >= 1000000:
    level = "金卡級"
else:
    level = "一般級"

print(f"存款 {balance:,.0f} 元 → 客戶等級：{level}")`,
        hint: "改改 balance 的數字，看看不同金額會被分到哪個等級。",
      },
      {
        type: "content",
        body: `接下來是 **for 迴圈** — 當你要對一大堆資料做同樣的事情時：`,
      },
      {
        type: "code_exercise",
        instruction: "用迴圈檢查一批客戶的存款，自動標記 VIP。",
        starterCode: `customers = [
    {"name": "王大明", "balance": 5000000},
    {"name": "李小華", "balance": 800000},
    {"name": "張美玲", "balance": 12000000},
    {"name": "陳志偉", "balance": 2000000},
    {"name": "林雅婷", "balance": 3500000},
]

print("=== 客戶 VIP 檢核報告 ===")
vip_count = 0

for c in customers:
    if c["balance"] >= 3000000:
        status = "✓ VIP"
        vip_count += 1
    else:
        status = "  一般"
    print(f"{status}  {c['name']}  {c['balance']:>12,.0f} 元")

print(f"\\n共 {len(customers)} 位客戶，其中 {vip_count} 位為 VIP")`,
        hint: "這就是數金 MA 日常工作的縮影：拿到一批資料 → 設定規則 → 自動處理 → 產出報告。",
      },
      {
        type: "quiz",
        question:
          '以下哪段程式碼可以「印出 list 中所有大於 100 萬的數字」？',
        options: [
          {
            text: "for x in numbers:\n    if x > 1000000:\n        print(x)",
            correct: true,
          },
          {
            text: "if numbers > 1000000:\n    print(numbers)",
            correct: false,
          },
          {
            text: "for x > 1000000 in numbers:\n    print(x)",
            correct: false,
          },
        ],
        explanation:
          "要逐一檢查 list 中的每個元素，必須先用 for 迴圈取出每個元素，再用 if 判斷條件。",
      },
    ],
  },
  {
    id: "functions",
    day: "Day 3",
    stage: 1,
    title: "函數 — 把邏輯包裝起來",
    sections: [
      {
        type: "content",
        body: `**函數**就是「一套可以重複使用的流程」。

想像你在銀行每天都要幫客戶算複利，你不會每次都重寫公式，而是寫一個「計算機」，以後只要輸入數字就能得到答案。

在 Python 裡，用 \`def\` 來定義函數：`,
      },
      {
        type: "code_exercise",
        instruction:
          "寫一個計算複利的函數 compound_interest(principal, rate, years)。",
        starterCode: `def compound_interest(principal, rate, years):
    """計算複利終值"""
    result = principal * (1 + rate) ** years
    return result

# 測試：100 萬本金，年利率 2%，存 5 年
final = compound_interest(1000000, 0.02, 5)
print(f"本金：1,000,000 元")
print(f"年利率：2%")
print(f"存期：5 年")
print(f"到期金額：{final:,.0f} 元")
print(f"利息收入：{final - 1000000:,.0f} 元")

# 再算一組
final2 = compound_interest(500000, 0.03, 10)
print(f"\\n50 萬存 10 年（3%）：{final2:,.0f} 元")`,
        hint: "函數用 def 定義，用 return 回傳結果。定義好之後，隨時可以用不同的參數呼叫它。",
      },
      {
        type: "code_exercise",
        instruction:
          "寫一個客戶分級函數 classify_customer(balance)，用 if/elif 回傳等級。",
        starterCode: `def classify_customer(balance):
    """根據存款金額回傳客戶等級"""
    if balance >= 10000000:
        return "鑽石級"
    elif balance >= 3000000:
        return "白金級"
    elif balance >= 1000000:
        return "金卡級"
    else:
        return "一般級"

# 測試不同客戶
customers = [
    ("王大明", 15000000),
    ("李小華", 2500000),
    ("張美玲", 800000),
    ("陳志偉", 5000000),
]

for name, bal in customers:
    level = classify_customer(bal)
    print(f"{name}：{bal:>12,.0f} 元 → {level}")`,
        hint: "把之前的 if/elif 放進函數裡，用 return 取代 level = 。這樣每次需要分級時，只要呼叫函數就好。",
      },
      {
        type: "quiz",
        question: "函數的 return 和 print 差在哪？",
        options: [
          {
            text: "return 會把值傳回去讓程式繼續用，print 只是顯示在螢幕上",
            correct: true,
          },
          {
            text: "沒有差別，都是把結果輸出",
            correct: false,
          },
          {
            text: "print 比 return 更快",
            correct: false,
          },
          {
            text: "return 只能用在迴圈裡",
            correct: false,
          },
        ],
        explanation:
          "return 把值傳回呼叫的地方，你可以把它存到變數裡繼續運算。print 只是顯示文字，程式拿不到那個值。在實際工作中，函數幾乎都用 return。",
      },
    ],
  },

  // ===== 階段二：pandas 數據分析（Day 4-7）=====
  {
    id: "pandas-intro",
    day: "Day 4",
    stage: 2,
    title: "認識 pandas 與 DataFrame",
    sections: [
      {
        type: "content",
        body: `**pandas** 是 Python 最重要的數據分析套件，它的核心概念是 **DataFrame** — 你可以把它想成是 Python 裡的 Excel 表格。

每一欄（column）是一個欄位，每一列（row）是一筆資料。

在 Pyodide（瀏覽器端的 Python）裡可以直接用 pandas，讓我們來試試：`,
      },
      {
        type: "code_exercise",
        instruction:
          "用字典建立一個客戶 DataFrame，印出來看結構。",
        starterCode: `import pandas as pd

# 用字典建立 DataFrame
data = {
    "姓名": ["王大明", "李小華", "張美玲", "陳志偉", "林雅婷"],
    "年齡": [35, 28, 42, 31, 26],
    "存款": [5000000, 800000, 12000000, 2000000, 3500000],
    "等級": ["白金", "一般", "鑽石", "金卡", "白金"],
}

df = pd.DataFrame(data)
print(df)`,
        hint: "pandas 的 DataFrame 就像 Excel 表格，用字典的 key 當欄位名，value 的 list 當每欄的資料。",
      },
      {
        type: "code_exercise",
        instruction:
          "用 .head()、.shape、.describe() 快速了解資料。",
        starterCode: `import pandas as pd

data = {
    "姓名": ["王大明", "李小華", "張美玲", "陳志偉", "林雅婷",
            "黃小芳", "劉大偉", "許雅文", "鄭志明", "蔡小玲"],
    "年齡": [35, 28, 42, 31, 26, 39, 45, 33, 29, 37],
    "存款": [5000000, 800000, 12000000, 2000000, 3500000,
            1500000, 8000000, 950000, 4200000, 6100000],
    "月交易筆數": [12, 3, 25, 8, 15, 6, 20, 4, 18, 11],
}

df = pd.DataFrame(data)

# 看前 5 筆
print("=== 前 5 筆資料 ===")
print(df.head())

# 看資料的「形狀」（幾列 x 幾欄）
print(f"\\n資料形狀：{df.shape}")
print(f"共 {df.shape[0]} 位客戶，{df.shape[1]} 個欄位")

# 數值欄位的統計摘要
print("\\n=== 統計摘要 ===")
print(df.describe())`,
        hint: ".head() 看前幾筆、.shape 看幾列幾欄、.describe() 看平均值/最大最小值等統計資訊。這些是拿到新資料時一定會先做的事。",
      },
    ],
  },
  {
    id: "pandas-filter",
    day: "Day 5",
    stage: 2,
    title: "資料篩選與清洗",
    sections: [
      {
        type: "content",
        body: `在 Excel 裡你會用「篩選」功能找特定的資料，在 pandas 裡也一樣簡單。

核心語法是 \`df[df['欄位'] 條件]\`，看起來有點奇怪，但其實就是在說「從 df 裡，挑出符合條件的那些列」。`,
      },
      {
        type: "code_exercise",
        instruction: "篩選出存款大於 100 萬的客戶。",
        starterCode: `import pandas as pd

data = {
    "姓名": ["王大明", "李小華", "張美玲", "陳志偉", "林雅婷"],
    "年齡": [35, 28, 42, 31, 26],
    "存款": [5000000, 800000, 12000000, 2000000, 3500000],
    "等級": ["白金", "一般", "鑽石", "金卡", "白金"],
}

df = pd.DataFrame(data)

# 篩選存款 > 100 萬的客戶
rich = df[df["存款"] > 1000000]
print("=== 存款超過 100 萬的客戶 ===")
print(rich)

# 也可以多條件篩選（用 & 表示「且」）
vip_young = df[(df["存款"] > 1000000) & (df["年齡"] < 35)]
print("\\n=== 存款超過 100 萬且年齡小於 35 ===")
print(vip_young)`,
        hint: "df[df['欄位'] > 值] 就是「從 df 裡篩選出欄位大於某值的列」。多條件用 & (且) 或 | (或)，記得每個條件要加括號。",
      },
      {
        type: "code_exercise",
        instruction:
          "處理缺失值（.isna()、.fillna()、.dropna()）。",
        starterCode: `import pandas as pd
import numpy as np

data = {
    "姓名": ["王大明", "李小華", "張美玲", "陳志偉", "林雅婷"],
    "年齡": [35, None, 42, 31, None],
    "存款": [5000000, 800000, None, 2000000, 3500000],
    "等級": ["白金", "一般", "鑽石", "金卡", "白金"],
}

df = pd.DataFrame(data)
print("=== 原始資料（有缺失值）===")
print(df)

# 檢查哪些地方有缺失值
print("\\n=== 缺失值檢查 ===")
print(df.isna().sum())

# 方法 1：填補缺失值（用平均值填）
df_filled = df.copy()
df_filled["年齡"] = df_filled["年齡"].fillna(df_filled["年齡"].mean())
df_filled["存款"] = df_filled["存款"].fillna(df_filled["存款"].mean())
print("\\n=== 填補後 ===")
print(df_filled)

# 方法 2：直接刪掉有缺失值的列
df_dropped = df.dropna()
print("\\n=== 刪掉缺失列後 ===")
print(df_dropped)`,
        hint: "現實中資料常常有缺值。isna() 檢查哪裡缺、fillna() 填補、dropna() 直接刪掉。哪個方法好要看情境。",
      },
      {
        type: "quiz",
        question: "df[df['age'] > 30] 這行在做什麼？",
        options: [
          { text: "建立一個新的欄位叫 age", correct: false },
          {
            text: "從 df 中篩選出 age 大於 30 的所有列",
            correct: true,
          },
          { text: "把所有 age 的值改成 30", correct: false },
          { text: "刪除 age 小於 30 的資料", correct: false },
        ],
        explanation:
          "df['age'] > 30 會產生一個 True/False 的 Series，放進 df[...] 就會篩選出 True 的那些列。原始 df 不會被改變。",
      },
    ],
  },
  {
    id: "pandas-groupby",
    day: "Day 6",
    stage: 2,
    title: "groupby 與統計分析",
    sections: [
      {
        type: "content",
        body: `**groupby** 是 pandas 最強大的功能之一，等同於 Excel 的樞紐分析表（Pivot Table）。

概念很簡單：「把資料**按照某個欄位分組**，然後對每組做統計」。

> 面試官最愛問的就是 groupby，因為它代表你有「分群分析」的思維。`,
      },
      {
        type: "code_exercise",
        instruction: "按客戶等級分組，算各組平均存款。",
        starterCode: `import pandas as pd

data = {
    "姓名": ["王大明", "李小華", "張美玲", "陳志偉", "林雅婷",
            "黃小芳", "劉大偉", "許雅文"],
    "等級": ["白金", "一般", "鑽石", "金卡", "白金",
            "一般", "鑽石", "金卡"],
    "存款": [5000000, 800000, 12000000, 2000000, 3500000,
            600000, 9000000, 1800000],
    "月交易筆數": [12, 3, 25, 8, 15, 2, 22, 7],
}

df = pd.DataFrame(data)

# 按等級分組，算平均存款
print("=== 各等級平均存款 ===")
avg_by_level = df.groupby("等級")["存款"].mean()
print(avg_by_level)

# 按等級分組，同時算多個統計
print("\\n=== 各等級詳細統計 ===")
stats = df.groupby("等級").agg({
    "存款": ["mean", "sum", "count"],
    "月交易筆數": "mean"
})
print(stats)`,
        hint: "groupby('欄位') 先分組，後面接 .mean() / .sum() / .count() 等做統計。.agg() 可以同時算多種統計。",
      },
      {
        type: "code_exercise",
        instruction:
          "按年齡區間分組，算各區間的交易筆數和總金額。",
        starterCode: `import pandas as pd

data = {
    "姓名": ["王大明", "李小華", "張美玲", "陳志偉", "林雅婷",
            "黃小芳", "劉大偉", "許雅文", "鄭志明", "蔡小玲"],
    "年齡": [35, 28, 42, 31, 26, 39, 45, 33, 29, 52],
    "存款": [5000000, 800000, 12000000, 2000000, 3500000,
            1500000, 8000000, 950000, 4200000, 6100000],
    "月交易筆數": [12, 3, 25, 8, 15, 6, 20, 4, 18, 11],
}

df = pd.DataFrame(data)

# 先建立年齡區間欄位
df["年齡區間"] = pd.cut(df["年齡"],
    bins=[20, 30, 40, 50, 60],
    labels=["20-30", "30-40", "40-50", "50-60"])

# 按年齡區間分組統計
result = df.groupby("年齡區間", observed=True).agg({
    "月交易筆數": ["sum", "mean"],
    "存款": ["sum", "mean", "count"]
})

print("=== 各年齡區間統計 ===")
print(result)`,
        hint: "pd.cut() 可以把連續的數字切成區間。搭配 groupby 就能做「各年齡層分析」這類常見的商業分析。",
      },
    ],
  },
  {
    id: "visualization",
    day: "Day 7",
    stage: 2,
    title: "資料視覺化",
    sections: [
      {
        type: "content",
        body: `數據分析的最後一步是**視覺化** — 把數字變成圖表，讓人一眼就能看出趨勢和問題。

在瀏覽器環境中，我們用文字方式呈現圖表概念。實際工作中你會用 matplotlib 畫出漂亮的圖表。

> 面試小技巧：被問到分析結果時，說「我會用長條圖呈現各群組的差異」會比只說數字更有說服力。`,
      },
      {
        type: "code_exercise",
        instruction:
          "模擬長條圖 — 各客戶等級的人數分布。",
        starterCode: `import pandas as pd

data = {
    "姓名": ["王大明", "李小華", "張美玲", "陳志偉", "林雅婷",
            "黃小芳", "劉大偉", "許雅文", "鄭志明", "蔡小玲",
            "周大中", "吳小雯"],
    "等級": ["白金", "一般", "鑽石", "金卡", "白金",
            "一般", "鑽石", "金卡", "白金", "一般",
            "金卡", "一般"],
}

df = pd.DataFrame(data)

# 統計各等級人數
counts = df["等級"].value_counts()
print("=== 各等級客戶人數 ===")
print(counts)

# 用文字模擬長條圖
print("\\n=== 客戶等級分布圖 ===")
max_count = counts.max()
for level, count in counts.items():
    bar = "█" * int(count / max_count * 30)
    print(f"{level:>4}  {bar} {count} 人")`,
        hint: "value_counts() 會統計每個值出現幾次。在實際工作中，你可以用 matplotlib 的 plt.bar() 畫出真正的長條圖。",
      },
      {
        type: "code_exercise",
        instruction: "模擬折線圖 — 月度交易金額趨勢。",
        starterCode: `import pandas as pd

# 模擬月度交易金額
months = ["1月", "2月", "3月", "4月", "5月", "6月",
          "7月", "8月", "9月", "10月", "11月", "12月"]
amounts = [1250, 980, 1380, 1520, 1100, 1650,
           1420, 1780, 1350, 1900, 2100, 2350]

df = pd.DataFrame({"月份": months, "交易金額(萬)": amounts})

print("=== 月度交易金額 ===")
print(df.to_string(index=False))

# 文字折線圖
print("\\n=== 交易金額趨勢圖 ===")
min_val = min(amounts)
max_val = max(amounts)
for i, (m, a) in enumerate(zip(months, amounts)):
    pos = int((a - min_val) / (max_val - min_val) * 40)
    line = " " * pos + "●"
    print(f"{m:>4} {a:>5} {line}")

# 基本統計
print(f"\\n年度最高：{max(amounts)} 萬（{months[amounts.index(max(amounts))]}）")
print(f"年度最低：{min(amounts)} 萬（{months[amounts.index(min(amounts))]}）")
print(f"年度平均：{sum(amounts)/len(amounts):.0f} 萬")`,
        hint: "折線圖適合呈現時間趨勢。面試時如果說到「客戶行為隨時間的變化」，折線圖是最佳選擇。",
      },
    ],
  },

  // ===== 階段三：SQL 基礎（Day 8-10）=====
  {
    id: "sql-basics",
    day: "Day 8",
    stage: 3,
    title: "SQL 是什麼？基本查詢",
    sections: [
      {
        type: "content",
        body: `**SQL（Structured Query Language）** 是跟資料庫「問問題」的語言。

銀行的資料都存在資料庫裡，而 SQL 就是你取資料的工具。好消息是：Python 內建 sqlite3 套件，可以直接在程式裡操作資料庫。

SQL 的基本語法：
> \`SELECT 欄位 FROM 表格 WHERE 條件\`

翻譯成中文就是：「從 XX 表格中，選出符合 XX 條件的 XX 欄位」。`,
      },
      {
        type: "code_exercise",
        instruction:
          "用 Python sqlite3 建立一個客戶資料表，執行 SELECT * FROM customers。",
        starterCode: `import sqlite3

# 建立記憶體資料庫
conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

# 建立客戶表格
cursor.execute("""
    CREATE TABLE customers (
        id INTEGER PRIMARY KEY,
        name TEXT,
        age INTEGER,
        balance REAL,
        level TEXT
    )
""")

# 插入資料
customers = [
    (1, "王大明", 35, 5000000, "白金"),
    (2, "李小華", 28, 800000, "一般"),
    (3, "張美玲", 42, 12000000, "鑽石"),
    (4, "陳志偉", 31, 2000000, "金卡"),
    (5, "林雅婷", 26, 3500000, "白金"),
]

cursor.executemany("INSERT INTO customers VALUES (?, ?, ?, ?, ?)", customers)

# 查詢所有客戶
cursor.execute("SELECT * FROM customers")
rows = cursor.fetchall()

print("=== 所有客戶 ===")
print(f"{'ID':>3} {'姓名':<6} {'年齡':>4} {'存款':>12} {'等級':<4}")
print("-" * 40)
for row in rows:
    print(f"{row[0]:>3} {row[1]:<6} {row[2]:>4} {row[3]:>12,.0f} {row[4]:<4}")

conn.close()`,
        hint: "sqlite3 是 Python 內建的，不需要額外安裝。':memory:' 表示資料庫存在記憶體裡（練習用）。",
      },
      {
        type: "code_exercise",
        instruction:
          "用 WHERE 條件篩選資料。",
        starterCode: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE customers (
        id INTEGER PRIMARY KEY,
        name TEXT,
        age INTEGER,
        balance REAL,
        level TEXT
    )
""")

customers = [
    (1, "王大明", 35, 5000000, "白金"),
    (2, "李小華", 28, 800000, "一般"),
    (3, "張美玲", 42, 12000000, "鑽石"),
    (4, "陳志偉", 31, 2000000, "金卡"),
    (5, "林雅婷", 26, 3500000, "白金"),
    (6, "黃小芳", 39, 1500000, "金卡"),
    (7, "劉大偉", 45, 8000000, "鑽石"),
]

cursor.executemany("INSERT INTO customers VALUES (?, ?, ?, ?, ?)", customers)

# WHERE 篩選：存款超過 300 萬
print("=== 存款超過 300 萬 ===")
cursor.execute("SELECT name, balance FROM customers WHERE balance > 3000000")
for row in cursor.fetchall():
    print(f"  {row[0]}：{row[1]:,.0f} 元")

# WHERE + AND：30 歲以上且白金級
print("\\n=== 30 歲以上的白金客戶 ===")
cursor.execute("SELECT name, age FROM customers WHERE age >= 30 AND level = '白金'")
for row in cursor.fetchall():
    print(f"  {row[0]}，{row[1]} 歲")

# ORDER BY：按存款排序
print("\\n=== 依存款排序（高到低）===")
cursor.execute("SELECT name, balance FROM customers ORDER BY balance DESC")
for row in cursor.fetchall():
    print(f"  {row[0]}：{row[1]:,.0f} 元")

conn.close()`,
        hint: "WHERE 就像 pandas 的條件篩選，ORDER BY 就像 sort_values()。SQL 的邏輯和 pandas 很像，只是語法不同。",
      },
    ],
  },
  {
    id: "sql-advanced",
    day: "Day 9",
    stage: 3,
    title: "進階查詢 — GROUP BY、ORDER BY、JOIN",
    sections: [
      {
        type: "content",
        body: `SQL 的 **GROUP BY** 和 pandas 的 \`groupby()\` 完全對應：

| SQL | pandas |
|-----|--------|
| \`GROUP BY level\` | \`df.groupby('level')\` |
| \`COUNT(*)\` | \`.count()\` |
| \`AVG(balance)\` | \`.mean()\` |
| \`SUM(balance)\` | \`.sum()\` |

而 **JOIN** 是把兩張表格合在一起 — 就像 Excel 的 VLOOKUP。`,
      },
      {
        type: "code_exercise",
        instruction:
          "GROUP BY + COUNT/AVG — 統計各等級客戶數。",
        starterCode: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE customers (
        id INTEGER PRIMARY KEY,
        name TEXT, age INTEGER,
        balance REAL, level TEXT
    )
""")

data = [
    (1,"王大明",35,5000000,"白金"), (2,"李小華",28,800000,"一般"),
    (3,"張美玲",42,12000000,"鑽石"), (4,"陳志偉",31,2000000,"金卡"),
    (5,"林雅婷",26,3500000,"白金"), (6,"黃小芳",39,600000,"一般"),
    (7,"劉大偉",45,8000000,"鑽石"), (8,"許雅文",33,1800000,"金卡"),
    (9,"鄭志明",29,4200000,"白金"), (10,"蔡小玲",52,900000,"一般"),
]
cursor.executemany("INSERT INTO customers VALUES (?,?,?,?,?)", data)

# GROUP BY 統計
cursor.execute("""
    SELECT level,
           COUNT(*) as 人數,
           AVG(balance) as 平均存款,
           SUM(balance) as 存款總額
    FROM customers
    GROUP BY level
    ORDER BY 平均存款 DESC
""")

print("=== 各等級客戶統計 ===")
print(f"{'等級':<6} {'人數':>4} {'平均存款':>14} {'存款總額':>14}")
print("-" * 44)
for row in cursor.fetchall():
    print(f"{row[0]:<6} {row[1]:>4} {row[2]:>14,.0f} {row[3]:>14,.0f}")

conn.close()`,
        hint: "GROUP BY 搭配 COUNT、AVG、SUM 等聚合函數，就能做出分組統計報表。ORDER BY 可以排序結果。",
      },
      {
        type: "code_exercise",
        instruction: "JOIN 兩張表 — 客戶表 + 交易表。",
        starterCode: `import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

# 建立客戶表
cursor.execute("""
    CREATE TABLE customers (
        id INTEGER PRIMARY KEY,
        name TEXT, level TEXT
    )
""")

# 建立交易表
cursor.execute("""
    CREATE TABLE transactions (
        id INTEGER PRIMARY KEY,
        customer_id INTEGER,
        amount REAL,
        type TEXT
    )
""")

# 插入客戶資料
cursor.executemany("INSERT INTO customers VALUES (?,?,?)", [
    (1, "王大明", "白金"), (2, "李小華", "一般"), (3, "張美玲", "鑽石"),
])

# 插入交易資料
cursor.executemany("INSERT INTO transactions VALUES (?,?,?,?)", [
    (1, 1, 50000, "轉帳"), (2, 1, 200000, "存款"),
    (3, 2, 30000, "提款"), (4, 3, 500000, "轉帳"),
    (5, 3, 1000000, "存款"), (6, 2, 15000, "消費"),
])

# JOIN：把客戶名稱和交易記錄合在一起
print("=== 客戶交易明細（JOIN）===")
cursor.execute("""
    SELECT c.name, c.level, t.type, t.amount
    FROM transactions t
    JOIN customers c ON t.customer_id = c.id
    ORDER BY c.name
""")

for row in cursor.fetchall():
    print(f"  {row[0]}（{row[1]}）— {row[2]}：{row[3]:,.0f} 元")

# JOIN + GROUP BY：各客戶的交易統計
print("\\n=== 各客戶交易統計 ===")
cursor.execute("""
    SELECT c.name, COUNT(*) as 筆數, SUM(t.amount) as 總金額
    FROM transactions t
    JOIN customers c ON t.customer_id = c.id
    GROUP BY c.name
""")

for row in cursor.fetchall():
    print(f"  {row[0]}：{row[1]} 筆，共 {row[2]:,.0f} 元")

conn.close()`,
        hint: "JOIN 用 ON 指定兩張表怎麼連接（通常是 id 對 id）。這是 SQL 面試必考題！",
      },
      {
        type: "quiz",
        question: "SQL 的 GROUP BY 和 pandas 的 groupby 對應關係，下列何者正確？",
        options: [
          {
            text: "SQL 的 GROUP BY 等同於 pandas 的 sort_values()",
            correct: false,
          },
          {
            text: "SQL 的 SELECT level, COUNT(*) FROM t GROUP BY level\n等同於 df.groupby('level').size()",
            correct: true,
          },
          {
            text: "GROUP BY 只能在 SQL 裡用，pandas 沒有類似功能",
            correct: false,
          },
        ],
        explanation:
          "SQL 的 GROUP BY + 聚合函數 和 pandas 的 groupby() + 聚合方法 邏輯完全一樣，只是語法不同。掌握一個，另一個很快就能上手。",
      },
    ],
  },
  {
    id: "python-sql-integration",
    day: "Day 10",
    stage: 3,
    title: "Python + SQL 整合應用",
    sections: [
      {
        type: "content",
        body: `在實際工作中，你不會只用 SQL 或只用 pandas — 而是兩個搭配著用：

1. 用 SQL 從資料庫取資料
2. 用 pandas 做進一步分析
3. 產出報告或視覺化

這就是數金 MA 的典型工作流程。讓我們走過一次完整的流程：`,
      },
      {
        type: "code_exercise",
        instruction:
          "完整流程：建資料庫 → 寫入資料 → SQL 查詢 → pandas 分析 → 印出報告。",
        starterCode: `import sqlite3
import pandas as pd

# === Step 1: 建立資料庫 ===
conn = sqlite3.connect(":memory:")
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE customers (
        id INTEGER, name TEXT, age INTEGER,
        balance REAL, level TEXT, branch TEXT
    )
""")

data = [
    (1,"王大明",35,5000000,"白金","台北"),
    (2,"李小華",28,800000,"一般","台中"),
    (3,"張美玲",42,12000000,"鑽石","台北"),
    (4,"陳志偉",31,2000000,"金卡","高雄"),
    (5,"林雅婷",26,3500000,"白金","台北"),
    (6,"黃小芳",39,600000,"一般","台中"),
    (7,"劉大偉",45,8000000,"鑽石","高雄"),
    (8,"許雅文",33,1800000,"金卡","台北"),
]

cursor.executemany("INSERT INTO customers VALUES (?,?,?,?,?,?)", data)
conn.commit()

# === Step 2: 用 SQL 查詢 ===
query = "SELECT * FROM customers WHERE balance > 1000000"

# === Step 3: 用 pandas 讀取 SQL 結果 ===
df = pd.read_sql_query(query, conn)
print("=== 存款超過 100 萬的客戶 ===")
print(df)

# === Step 4: 用 pandas 做分析 ===
print("\\n=== 各分行統計 ===")
branch_stats = df.groupby("branch").agg({
    "balance": ["count", "mean", "sum"]
})
print(branch_stats)

print("\\n=== 各等級平均年齡與存款 ===")
level_stats = df.groupby("level").agg({
    "age": "mean",
    "balance": "mean"
})
print(level_stats)

conn.close()
print("\\n✓ 分析完成！")`,
        hint: "pd.read_sql_query() 是 SQL 和 pandas 的橋樑 — 它直接把 SQL 查詢結果變成 DataFrame，非常方便。",
      },
    ],
  },

  // ===== 階段四：面試模擬（Day 11-14）=====
  {
    id: "analysis-framework",
    day: "Day 11",
    stage: 4,
    title: "數據分析的思路框架",
    sections: [
      {
        type: "content",
        body: `面試時被問到「你會怎麼用數據解決 X 問題？」時，用這個框架回答：

> **1. 釐清問題** → 2. 確認需要什麼數據 → 3. 取得與清洗 → 4. 分析方法 → 5. 呈現結果

這不只是面試技巧，也是數金 MA 日常工作的標準流程。

讓我們用一個實際案例走過整個流程：

**情境：信用卡客戶流失分析**
> 主管問你：「最近信用卡客戶流失率升高了，你能幫我分析一下是怎麼回事嗎？」`,
      },
      {
        type: "code_exercise",
        instruction:
          "用程式碼走過一個完整的客戶流失分析流程。",
        starterCode: `import pandas as pd

# === Step 1: 模擬資料 ===
data = {
    "客戶ID": range(1, 21),
    "年齡": [25,32,45,28,52,35,41,29,38,47,
            26,33,44,31,55,36,42,27,39,48],
    "月消費次數": [15,8,3,12,2,10,4,14,6,1,
                  13,9,2,11,1,7,3,16,5,2],
    "持卡年數": [1,3,8,2,10,4,6,1,5,12,
               1,3,7,2,11,4,6,1,5,9],
    "是否流失": [0,0,1,0,1,0,1,0,0,1,
               0,0,1,0,1,0,1,0,0,1],
}

df = pd.DataFrame(data)

# === Step 2: 快速了解資料 ===
print("=== 資料概覽 ===")
print(f"共 {len(df)} 位客戶")
print(f"流失率：{df['是否流失'].mean():.1%}")

# === Step 3: 分群分析 ===
# 按年齡分組看流失率
df["年齡層"] = pd.cut(df["年齡"], bins=[20,30,40,50,60],
                     labels=["20-30","30-40","40-50","50-60"])

print("\\n=== 各年齡層流失率 ===")
age_churn = df.groupby("年齡層", observed=True)["是否流失"].mean()
for age, rate in age_churn.items():
    bar = "█" * int(rate * 30)
    print(f"  {age}: {rate:.0%} {bar}")

# 按消費頻率分組
df["消費頻率"] = pd.cut(df["月消費次數"], bins=[0,5,10,20],
                      labels=["低","中","高"])

print("\\n=== 各消費頻率流失率 ===")
freq_churn = df.groupby("消費頻率", observed=True)["是否流失"].mean()
for freq, rate in freq_churn.items():
    bar = "█" * int(rate * 30)
    print(f"  {freq}頻率: {rate:.0%} {bar}")

# === Step 4: 結論 ===
print("\\n=== 分析結論 ===")
print("1. 40 歲以上客戶流失率明顯較高")
print("2. 低消費頻率客戶流失風險最大")
print("3. 建議：針對低活躍度的中高齡客戶加強經營")`,
        hint: "面試時展示這樣的分析流程：先看整體→再分群→找出差異→提出建議。這就是數據思維。",
      },
    ],
  },
  {
    id: "interview-qa",
    day: "Day 12",
    stage: 4,
    title: "常見面試問答",
    sections: [
      {
        type: "content",
        body: `數金 MA 面試常見的程式相關問題，讓我們逐一練習：`,
      },
      {
        type: "quiz",
        question: "Python 和 Excel 的差異？什麼時候該用哪個？",
        options: [
          {
            text: "Python 適合大量數據和自動化，Excel 適合小量數據和快速瀏覽",
            correct: true,
          },
          {
            text: "Python 比 Excel 好，所有情況都該用 Python",
            correct: false,
          },
          {
            text: "Excel 功能比 Python 多",
            correct: false,
          },
        ],
        explanation:
          "面試回答：「Excel 適合快速查看小量數據、做簡報圖表。但當資料量超過幾萬筆、需要重複性操作、或需要建立可重現的分析流程時，Python 更有效率。兩者是互補的工具。」",
      },
      {
        type: "quiz",
        question: "什麼是 DataFrame？",
        options: [
          {
            text: "Python 的一種函數",
            correct: false,
          },
          {
            text: "pandas 中的二維表格資料結構，類似 Excel 的工作表",
            correct: true,
          },
          {
            text: "一種資料庫軟體",
            correct: false,
          },
        ],
        explanation:
          "面試回答：「DataFrame 是 pandas 套件的核心資料結構，類似 Excel 的表格。每一列是一筆資料，每一欄是一個欄位。它支援篩選、排序、分組統計等操作，是 Python 做數據分析的基礎工具。」",
      },
      {
        type: "quiz",
        question: "你會怎麼做客戶分群？",
        options: [
          {
            text: "用 groupby 按某個特徵分組，然後比較各組的統計指標",
            correct: true,
          },
          {
            text: "用 print 把所有客戶印出來一個一個看",
            correct: false,
          },
          {
            text: "隨機分成幾組",
            correct: false,
          },
        ],
        explanation:
          "面試回答：「我會先確認分群的依據（例如消費頻率、存款金額），用 pandas 的 groupby 或 pd.cut 來分組，再用 mean、count、sum 等統計方法比較各群差異，最後用圖表呈現結果。」",
      },
      {
        type: "quiz",
        question: "SQL 的 JOIN 有哪些種類？",
        options: [
          {
            text: "INNER JOIN、LEFT JOIN、RIGHT JOIN、FULL JOIN",
            correct: true,
          },
          {
            text: "只有一種 JOIN",
            correct: false,
          },
          {
            text: "GROUP JOIN 和 ORDER JOIN",
            correct: false,
          },
        ],
        explanation:
          "面試回答：「INNER JOIN 取交集、LEFT JOIN 保留左表全部、RIGHT JOIN 保留右表全部、FULL JOIN 保留兩邊全部。最常用的是 INNER JOIN 和 LEFT JOIN。」",
      },
      {
        type: "quiz",
        question: "你用過哪些 Python 套件？各自的用途？",
        options: [
          {
            text: "pandas 做數據處理、matplotlib 做視覺化、sqlite3 操作資料庫",
            correct: true,
          },
          {
            text: "我只用過 print()",
            correct: false,
          },
          {
            text: "Django 和 Flask 做網站",
            correct: false,
          },
        ],
        explanation:
          "面試回答：「pandas 用於數據讀取、清洗、分析；matplotlib 用於資料視覺化；sqlite3 用於 SQL 資料庫操作。如果做機器學習會再加上 scikit-learn。這些套件涵蓋了數據分析的完整流程。」",
      },
    ],
  },
  {
    id: "final-project",
    day: "Day 13-14",
    stage: 4,
    title: "綜合專案 — 銀行交易數據分析",
    sections: [
      {
        type: "content",
        body: `恭喜你來到最後的總複習！

這個專案會用到你學過的所有技能：
• 變數、List、Dict
• 條件判斷、迴圈、函數
• pandas DataFrame、篩選、groupby
• SQL 查詢
• 數據分析思維

我們會模擬一組銀行交易資料，走過完整的分析流程。`,
      },
      {
        type: "code_exercise",
        instruction:
          "Step 1：用程式碼產生模擬資料，建立 DataFrame。",
        starterCode: `import pandas as pd
import random

# 固定隨機種子，讓結果可重現
random.seed(42)

# 模擬 50 筆客戶資料
names = [f"客戶{str(i).zfill(3)}" for i in range(1, 51)]
ages = [random.randint(22, 60) for _ in range(50)]
balances = [random.randint(100000, 15000000) for _ in range(50)]
monthly_txn = [random.randint(1, 30) for _ in range(50)]
branches = [random.choice(["台北", "台中", "高雄", "台南"]) for _ in range(50)]

df = pd.DataFrame({
    "姓名": names,
    "年齡": ages,
    "存款": balances,
    "月交易筆數": monthly_txn,
    "分行": branches,
})

# 快速檢查
print("=== 資料前 10 筆 ===")
print(df.head(10))
print(f"\\n資料形狀：{df.shape}")
print(f"\\n=== 統計摘要 ===")
print(df.describe())`,
        hint: "拿到新資料的第一步：用 head()、shape、describe() 快速了解資料長什麼樣。",
      },
      {
        type: "code_exercise",
        instruction: "Step 2：資料清洗與客戶分群。",
        starterCode: `import pandas as pd
import random

random.seed(42)

df = pd.DataFrame({
    "姓名": [f"客戶{str(i).zfill(3)}" for i in range(1, 51)],
    "年齡": [random.randint(22, 60) for _ in range(50)],
    "存款": [random.randint(100000, 15000000) for _ in range(50)],
    "月交易筆數": [random.randint(1, 30) for _ in range(50)],
    "分行": [random.choice(["台北","台中","高雄","台南"]) for _ in range(50)],
})

# 客戶分級函數
def classify(balance):
    if balance >= 10000000:
        return "鑽石"
    elif balance >= 3000000:
        return "白金"
    elif balance >= 1000000:
        return "金卡"
    else:
        return "一般"

# 套用分級
df["等級"] = df["存款"].apply(classify)

# 年齡分組
df["年齡層"] = pd.cut(df["年齡"],
    bins=[20, 30, 40, 50, 60],
    labels=["20-30", "30-40", "40-50", "50-60"])

print("=== 客戶等級分布 ===")
print(df["等級"].value_counts())

print("\\n=== 各等級平均存款 ===")
print(df.groupby("等級")["存款"].mean().apply(lambda x: f"{x:,.0f}"))

print("\\n=== 各年齡層人數 ===")
print(df["年齡層"].value_counts().sort_index())`,
        hint: "用 apply() 可以把自己寫的函數套用到整個欄位上。pd.cut() 把年齡切成區間。",
      },
      {
        type: "code_exercise",
        instruction: "Step 3：分組統計與交叉分析。",
        starterCode: `import pandas as pd
import random

random.seed(42)

df = pd.DataFrame({
    "姓名": [f"客戶{str(i).zfill(3)}" for i in range(1, 51)],
    "年齡": [random.randint(22, 60) for _ in range(50)],
    "存款": [random.randint(100000, 15000000) for _ in range(50)],
    "月交易筆數": [random.randint(1, 30) for _ in range(50)],
    "分行": [random.choice(["台北","台中","高雄","台南"]) for _ in range(50)],
})

def classify(b):
    if b >= 10000000: return "鑽石"
    elif b >= 3000000: return "白金"
    elif b >= 1000000: return "金卡"
    else: return "一般"

df["等級"] = df["存款"].apply(classify)

# 各分行統計
print("=== 各分行統計 ===")
branch_stats = df.groupby("分行").agg({
    "姓名": "count",
    "存款": ["mean", "sum"],
    "月交易筆數": "mean"
})
print(branch_stats)

# 各分行的等級分布
print("\\n=== 各分行的等級分布 ===")
cross = pd.crosstab(df["分行"], df["等級"])
print(cross)

# 找出高價值客戶
high_value = df[(df["存款"] > 5000000) & (df["月交易筆數"] > 10)]
print(f"\\n=== 高價值活躍客戶（存款>500萬 且 月交易>10筆）===")
print(f"共 {len(high_value)} 位：")
for _, row in high_value.iterrows():
    print(f"  {row['姓名']} | {row['分行']} | {row['存款']:,.0f} 元 | {row['月交易筆數']} 筆/月")`,
        hint: "crosstab 做交叉表（類似 Excel 的樞紐分析）。多條件篩選用 & 連接，記得加括號。",
      },
      {
        type: "code_exercise",
        instruction:
          "Step 4：產出分析結論報告。",
        starterCode: `import pandas as pd
import random

random.seed(42)

df = pd.DataFrame({
    "姓名": [f"客戶{str(i).zfill(3)}" for i in range(1, 51)],
    "年齡": [random.randint(22, 60) for _ in range(50)],
    "存款": [random.randint(100000, 15000000) for _ in range(50)],
    "月交易筆數": [random.randint(1, 30) for _ in range(50)],
    "分行": [random.choice(["台北","台中","高雄","台南"]) for _ in range(50)],
})

def classify(b):
    if b >= 10000000: return "鑽石"
    elif b >= 3000000: return "白金"
    elif b >= 1000000: return "金卡"
    else: return "一般"

df["等級"] = df["存款"].apply(classify)

# === 最終報告 ===
print("=" * 50)
print("       銀行客戶數據分析報告")
print("=" * 50)

print(f"\\n📊 資料概覽")
print(f"   總客戶數：{len(df)} 位")
print(f"   平均存款：{df['存款'].mean():,.0f} 元")
print(f"   存款中位數：{df['存款'].median():,.0f} 元")

print(f"\\n📈 客戶等級分布")
for level, count in df["等級"].value_counts().items():
    pct = count / len(df) * 100
    bar = "█" * int(pct / 2)
    print(f"   {level:>4}：{count:>3} 人 ({pct:.0f}%) {bar}")

print(f"\\n🏦 各分行表現")
for branch in ["台北", "台中", "高雄", "台南"]:
    sub = df[df["分行"] == branch]
    print(f"   {branch}：{len(sub)} 人，平均存款 {sub['存款'].mean():,.0f} 元")

# 找出最佳分行
best = df.groupby("分行")["存款"].mean().idxmax()
print(f"\\n   ➤ 平均存款最高的分行：{best}")

print(f"\\n💡 建議")
print("   1. 加強經營一般級客戶，提升其存款至金卡等級")
print("   2. 針對高齡+高資產客戶推廣專屬理財服務")
print("   3. 分行間應分享最佳實務經驗")
print("\\n" + "=" * 50)
print("✅ 報告完成")`,
        hint: "一份好的分析報告要有：資料概覽、關鍵發現、視覺化呈現、具體建議。這就是面試時展示數據思維的方式。",
      },
    ],
  },
];

export const STAGES = [
  { id: 1, title: "Python 基礎", days: "Day 1-3" },
  { id: 2, title: "pandas 數據分析", days: "Day 4-7" },
  { id: 3, title: "SQL 基礎", days: "Day 8-10" },
  { id: 4, title: "面試模擬", days: "Day 11-14" },
];
