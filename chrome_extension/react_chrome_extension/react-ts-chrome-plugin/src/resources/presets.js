export const presets = {
  "Value Stocks": [
    {
      "id": "1",
      "name": "Mar Cap",
      "aliases": [
        "Market Cap"
      ],
      "conditions": [
        {
          "id": "1-1",
          "operator": "<",
          "value": 1000,
          "color": "#ffcdd2",
          "description": "Small Cap"
        },
        {
          "id": "1-2",
          "operator": "range",
          "value": 1000,
          "valueMax": 10000,
          "color": "#c8e6c9",
          "description": "Mid Cap"
        },
        {
          "id": "1-3",
          "operator": ">",
          "value": 10000,
          "color": "#bbdefb",
          "description": "Large Cap"
        }
      ],
      "isExpanded": true
    },
    {
      "id": "2",
      "name": "Price to Earning",
      "aliases": [
        "Stock P/E"
      ],
      "conditions": [
        {
          "id": "2-1",
          "operator": "<",
          "value": 12,
          "color": "#2fe980",
          "description": "Undervalued"
        },
        {
          "id": "2-2",
          "operator": "range",
          "value": 12,
          "valueMax": 20,
          "color": "#ffcc00",
          "description": "Fairly Valued"
        },
        {
          "id": "2-3",
          "operator": ">",
          "value": 20,
          "color": "#ff1a1a",
          "description": "Overvalued"
        },
        {
          "id": "2-4",
          "operator": "<",
          "value": 0,
          "color": "#ff1a1a",
          "description": "Negative Earnings"
        }
      ]
    },
    {
      "id": "3",
      "name": "Price to book value",
      "conditions": [
        {
          "id": "3-1",
          "operator": "<",
          "value": 1,
          "color": "#2fe980",
          "description": "Deep Value"
        },
        {
          "id": "3-2",
          "operator": "range",
          "value": 1,
          "valueMax": 3,
          "color": "#ffcc00",
          "description": "Reasonable"
        },
        {
          "id": "3-3",
          "operator": ">",
          "value": 3,
          "color": "#ff1a1a",
          "description": "Expensive"
        }
      ]
    },
    {
      "id": "4",
      "name": "EVEBITDA",
      "conditions": [
        {
          "id": "4-1",
          "operator": "<",
          "value": 8,
          "color": "#2fe980",
          "description": "Undervalued"
        },
        {
          "id": "4-2",
          "operator": "range",
          "value": 8,
          "valueMax": 12,
          "color": "#ffcc00",
          "description": "Fair Value"
        },
        {
          "id": "4-3",
          "operator": ">",
          "value": 12,
          "color": "#ff1a1a",
          "description": "Overvalued"
        }
      ]
    },
    {
      "id": "5",
      "name": "Dividend yield",
      "conditions": [
        {
          "id": "5-1",
          "operator": ">",
          "value": 4,
          "color": "#2fe980",
          "description": "High Yield"
        },
        {
          "id": "5-2",
          "operator": "range",
          "value": 2,
          "valueMax": 4,
          "color": "#ffcc00",
          "description": "Moderate Yield"
        },
        {
          "id": "5-3",
          "operator": "<",
          "value": 2,
          "color": "#ff1a1a",
          "description": "Low Yield"
        }
      ]
    },
    {
      "id": "6",
      "name": "Debt to equity",
      "conditions": [
        {
          "id": "6-1",
          "operator": "<",
          "value": 0.5,
          "color": "#2fe980",
          "description": "Low Debt"
        },
        {
          "id": "6-2",
          "operator": "range",
          "value": 0.5,
          "valueMax": 1,
          "color": "#ffcc00",
          "description": "Moderate Debt"
        },
        {
          "id": "6-3",
          "operator": ">",
          "value": 1,
          "color": "#ff1a1a",
          "description": "High Debt"
        }
      ]
    },
    {
      "id": "7",
      "name": "Current ratio",
      "conditions": [
        {
          "id": "7-1",
          "operator": ">",
          "value": 2,
          "color": "#2fe980",
          "description": "Strong Liquidity"
        },
        {
          "id": "7-2",
          "operator": "range",
          "value": 1,
          "valueMax": 2,
          "color": "#ffcc00",
          "description": "Adequate"
        },
        {
          "id": "7-3",
          "operator": "<",
          "value": 1,
          "color": "#ff1a1a",
          "description": "Weak Liquidity"
        }
      ]
    },
    {
      "id": "8",
      "name": "ROCE",
      "conditions": [
        {
          "id": "8-1",
          "operator": ">",
          "value": 15,
          "color": "#2fe980",
          "description": "High Efficiency"
        },
        {
          "id": "8-2",
          "operator": "range",
          "value": 10,
          "valueMax": 15,
          "color": "#ffcc00",
          "description": "Moderate"
        },
        {
          "id": "8-3",
          "operator": "<",
          "value": 10,
          "color": "#ff1a1a",
          "description": "Low Efficiency"
        }
      ]
    },
    {
      "id": "9",
      "name": "Piotroski score",
      "conditions": [
        {
          "id": "9-1",
          "operator": ">=",
          "value": 7,
          "color": "#2fe980",
          "description": "Strong Financials"
        },
        {
          "id": "9-2",
          "operator": "range",
          "value": 4,
          "valueMax": 6,
          "color": "#ffcc00",
          "description": "Average"
        },
        {
          "id": "9-3",
          "operator": "<",
          "value": 4,
          "color": "#ff1a1a",
          "description": "Weak Financials"
        }
      ]
    },
    {
      "id": "10",
      "name": "Price to Cash Flow",
      "conditions": [
        {
          "id": "10-1",
          "operator": "<",
          "value": 8,
          "color": "#2fe980",
          "description": "Undervalued"
        },
        {
          "id": "10-2",
          "operator": "range",
          "value": 8,
          "valueMax": 15,
          "color": "#ffcc00",
          "description": "Fairly Valued"
        },
        {
          "id": "10-3",
          "operator": ">",
          "value": 15,
          "color": "#ff1a1a",
          "description": "Overvalued"
        }
      ]
    },
    {
      "id": "11",
      "name": "Graham Number",
      "conditions": [
        {
          "id": "11-1",
          "operator": ">",
          "value": 1.5,
          "color": "#2fe980",
          "description": "Significant Discount"
        },
        {
          "id": "11-2",
          "operator": "range",
          "value": 1,
          "valueMax": 1.5,
          "color": "#ffcc00",
          "description": "Moderate Discount"
        },
        {
          "id": "11-3",
          "operator": "<",
          "value": 1,
          "color": "#ff1a1a",
          "description": "Overvalued"
        }
      ]
    },
    {
      "id": "12",
      "name": "NCAVPS",
      "conditions": [
        {
          "id": "12-1",
          "operator": ">",
          "value": 0.66,
          "color": "#2fe980",
          "description": "Deep Value"
        },
        {
          "id": "12-2",
          "operator": "range",
          "value": 0.33,
          "valueMax": 0.66,
          "color": "#ffcc00",
          "description": "Margin of Safety"
        },
        {
          "id": "12-3",
          "operator": "<",
          "value": 0.33,
          "color": "#ff1a1a",
          "description": "No Margin"
        }
      ]
    },
    {
      "id": "13",
      "name": "Altman Z Score",
      "conditions": [
        {
          "id": "13-1",
          "operator": ">",
          "value": 3,
          "color": "#2fe980",
          "description": "Safe"
        },
        {
          "id": "13-2",
          "operator": "range",
          "value": 1.8,
          "valueMax": 3,
          "color": "#ffcc00",
          "description": "Grey Zone"
        },
        {
          "id": "13-3",
          "operator": "<",
          "value": 1.8,
          "color": "#ff1a1a",
          "description": "Distress"
        }
      ]
    },
    {
      "id": "14",
      "name": "Cash by market cap",
      "conditions": [
        {
          "id": "14-1",
          "operator": ">",
          "value": 0.3,
          "color": "#2fe980",
          "description": "High Cash"
        },
        {
          "id": "14-2",
          "operator": "range",
          "value": 0.1,
          "valueMax": 0.3,
          "color": "#ffcc00",
          "description": "Moderate Cash"
        },
        {
          "id": "14-3",
          "operator": "<",
          "value": 0.1,
          "color": "#ff1a1a",
          "description": "Low Cash"
        }
      ]
    },
    {
      "id": "15",
      "name": "Promoter holding",
      "conditions": [
        {
          "id": "15-1",
          "operator": ">",
          "value": 45,
          "color": "#2fe980",
          "description": "High Confidence"
        },
        {
          "id": "15-2",
          "operator": "range",
          "value": 30,
          "valueMax": 45,
          "color": "#ffcc00",
          "description": "Moderate"
        },
        {
          "id": "15-3",
          "operator": "<",
          "value": 30,
          "color": "#ff1a1a",
          "description": "Low Confidence"
        }
      ]
    }
  ],
  "Growth Stocks": [
    {
      "id": "1",
      "name": "Sales growth",
      "conditions": [
        {
          "id": "1-1",
          "operator": ">",
          "value": 20,
          "color": "#2fe980"
        },
        {
          "id": "1-2",
          "operator": "range",
          "value": 10,
          "valueMax": 20,
          "color": "#ffcc00"
        },
        {
          "id": "1-3",
          "operator": "<",
          "value": 10,
          "color": "#ff1a1a"
        }
      ],
      "isExpanded": true
    },
    {
      "id": "2",
      "name": "Profit growth",
      "conditions": [
        {
          "id": "2-1",
          "operator": ">",
          "value": 15,
          "color": "#2fe980"
        },
        {
          "id": "2-2",
          "operator": "range",
          "value": 5,
          "valueMax": 15,
          "color": "#ffcc00"
        },
        {
          "id": "2-3",
          "operator": "<",
          "value": 5,
          "color": "#ff1a1a"
        }
      ]
    },
    {
      "id": "3",
      "name": "Qtr Sales Var",
      "conditions": [
        {
          "id": "3-1",
          "operator": ">",
          "value": 25,
          "color": "#2fe980"
        },
        {
          "id": "3-2",
          "operator": "range",
          "value": 10,
          "valueMax": 25,
          "color": "#ffcc00"
        },
        {
          "id": "3-3",
          "operator": "<",
          "value": 10,
          "color": "#ff1a1a"
        }
      ]
    },
    {
      "id": "4",
      "name": "Qtr Profit Var",
      "conditions": [
        {
          "id": "4-1",
          "operator": ">",
          "value": 20,
          "color": "#2fe980"
        },
        {
          "id": "4-2",
          "operator": "range",
          "value": 5,
          "valueMax": 20,
          "color": "#ffcc00"
        },
        {
          "id": "4-3",
          "operator": "<",
          "value": 5,
          "color": "#ff1a1a"
        }
      ]
    },
    {
      "id": "5",
      "name": "ROCE",
      "conditions": [
        {
          "id": "5-1",
          "operator": ">",
          "value": 20,
          "color": "#2fe980"
        },
        {
          "id": "5-2",
          "operator": "range",
          "value": 10,
          "valueMax": 20,
          "color": "#ffcc00"
        },
        {
          "id": "5-3",
          "operator": "<",
          "value": 10,
          "color": "#ff1a1a"
        }
      ]
    },
    {
      "id": "6",
      "name": "Return on equity",
      "conditions": [
        {
          "id": "6-1",
          "operator": ">",
          "value": 18,
          "color": "#2fe980"
        },
        {
          "id": "6-2",
          "operator": "range",
          "value": 10,
          "valueMax": 18,
          "color": "#ffcc00"
        },
        {
          "id": "6-3",
          "operator": "<",
          "value": 10,
          "color": "#ff1a1a"
        }
      ]
    },
    {
      "id": "7",
      "name": "Debt to equity",
      "conditions": [
        {
          "id": "7-1",
          "operator": "<",
          "value": 0.5,
          "color": "#2fe980"
        },
        {
          "id": "7-2",
          "operator": "range",
          "value": 0.5,
          "valueMax": 1.5,
          "color": "#ffcc00"
        },
        {
          "id": "7-3",
          "operator": ">",
          "value": 1.5,
          "color": "#ff1a1a"
        }
      ]
    },
    {
      "id": "8",
      "name": "Price to Earning",
      "aliases": [
        "Stock P/E"
      ],
      "conditions": [
        {
          "id": "8-1",
          "operator": "<",
          "value": 25,
          "color": "#2fe980"
        },
        {
          "id": "8-2",
          "operator": "range",
          "value": 25,
          "valueMax": 50,
          "color": "#ffcc00"
        },
        {
          "id": "8-3",
          "operator": ">",
          "value": 50,
          "color": "#ff1a1a"
        }
      ]
    },
    {
      "id": "9",
      "name": "PEG Ratio",
      "conditions": [
        {
          "id": "9-1",
          "operator": "<",
          "value": 1,
          "color": "#2fe980"
        },
        {
          "id": "9-2",
          "operator": "range",
          "value": 1,
          "valueMax": 2,
          "color": "#ffcc00"
        },
        {
          "id": "9-3",
          "operator": ">",
          "value": 2,
          "color": "#ff1a1a"
        }
      ]
    },
    {
      "id": "10",
      "name": "Promoter holding",
      "conditions": [
        {
          "id": "10-1",
          "operator": ">",
          "value": 50,
          "color": "#2fe980"
        },
        {
          "id": "10-2",
          "operator": "range",
          "value": 30,
          "valueMax": 50,
          "color": "#ffcc00"
        },
        {
          "id": "10-3",
          "operator": "<",
          "value": 30,
          "color": "#ff1a1a"
        }
      ]
    },
    {
      "id": "11",
      "name": "Sales growth 3Years",
      "conditions": [
        {
          "id": "11-1",
          "operator": ">",
          "value": 15,
          "color": "#2fe980"
        },
        {
          "id": "11-2",
          "operator": "range",
          "value": 8,
          "valueMax": 15,
          "color": "#ffcc00"
        },
        {
          "id": "11-3",
          "operator": "<",
          "value": 8,
          "color": "#ff1a1a"
        }
      ]
    },
    {
      "id": "12",
      "name": "Profit Var 3Yrs",
      "conditions": [
        {
          "id": "12-1",
          "operator": ">",
          "value": 15,
          "color": "#2fe980"
        },
        {
          "id": "12-2",
          "operator": "range",
          "value": 5,
          "valueMax": 15,
          "color": "#ffcc00"
        },
        {
          "id": "12-3",
          "operator": "<",
          "value": 5,
          "color": "#ff1a1a"
        }
      ]
    },
    {
      "id": "13",
      "name": "ROCE 3Yr",
      "conditions": [
        {
          "id": "13-1",
          "operator": ">",
          "value": 18,
          "color": "#2fe980"
        },
        {
          "id": "13-2",
          "operator": "range",
          "value": 10,
          "valueMax": 18,
          "color": "#ffcc00"
        },
        {
          "id": "13-3",
          "operator": "<",
          "value": 10,
          "color": "#ff1a1a"
        }
      ]
    },
    {
      "id": "14",
      "name": "Price to Sales",
      "conditions": [
        {
          "id": "14-1",
          "operator": "<",
          "value": 3,
          "color": "#2fe980"
        },
        {
          "id": "14-2",
          "operator": "range",
          "value": 3,
          "valueMax": 8,
          "color": "#ffcc00"
        },
        {
          "id": "14-3",
          "operator": ">",
          "value": 8,
          "color": "#ff1a1a"
        }
      ]
    },
    {
      "id": "15",
      "name": "CMP / FCF",
      "conditions": [
        {
          "id": "15-1",
          "operator": "<",
          "value": 15,
          "color": "#2fe980"
        },
        {
          "id": "15-2",
          "operator": "range",
          "value": 15,
          "valueMax": 30,
          "color": "#ffcc00"
        },
        {
          "id": "15-3",
          "operator": ">",
          "value": 30,
          "color": "#ff1a1a"
        }
      ]
    }
  ],
  "Dividend Stocks": [
    {
      "id": "1",
      "name": "Dividend yield",
      "conditions": [
        {
          "id": "1-1",
          "operator": ">=",
          "value": 6,
          "color": "#2fe980",
          "description": "High Yield (>6%)"
        },
        {
          "id": "1-2",
          "operator": "range",
          "value": 4,
          "valueMax": 6,
          "color": "#ffcc00",
          "description": "Good Yield (4-6%)"
        },
        {
          "id": "1-3",
          "operator": "range",
          "value": 2,
          "valueMax": 4,
          "color": "#ffab91",
          "description": "Moderate Yield (2-4%)"
        },
        {
          "id": "1-4",
          "operator": "<",
          "value": 2,
          "color": "#ff1a1a",
          "description": "Low Yield (<2%)"
        }
      ],
      "isExpanded": true
    },
    {
      "id": "2",
      "name": "Dividend Payout",
      "conditions": [
        {
          "id": "2-1",
          "operator": "range",
          "value": 30,
          "valueMax": 60,
          "color": "#2fe980",
          "description": "Sustainable (30-60%)"
        },
        {
          "id": "2-2",
          "operator": "<",
          "value": 30,
          "color": "#ffcc00",
          "description": "Conservative (<30%)"
        },
        {
          "id": "2-3",
          "operator": ">",
          "value": 60,
          "color": "#ff1a1a",
          "description": "Unsustainable (>60%)"
        }
      ]
    },
    {
      "id": "3",
      "name": "Div 5Yrs",
      "conditions": [
        {
          "id": "3-1",
          "operator": ">",
          "value": 5,
          "color": "#2fe980",
          "description": "Consistent High Dividend"
        },
        {
          "id": "3-2",
          "operator": "range",
          "value": 3,
          "valueMax": 5,
          "color": "#ffcc00",
          "description": "Moderate History"
        },
        {
          "id": "3-3",
          "operator": "<",
          "value": 3,
          "color": "#ff1a1a",
          "description": "Inconsistent"
        }
      ]
    },
    {
      "id": "4",
      "name": "Free Cash Flow",
      "conditions": [
        {
          "id": "4-1",
          "operator": ">",
          "value": 0,
          "color": "#2fe980",
          "description": "Positive FCF"
        },
        {
          "id": "4-2",
          "operator": "<=",
          "value": 0,
          "color": "#ff1a1a",
          "description": "Negative FCF"
        }
      ]
    },
    {
      "id": "5",
      "name": "Debt to equity",
      "conditions": [
        {
          "id": "5-1",
          "operator": "<",
          "value": 0.5,
          "color": "#2fe980",
          "description": "Low Debt"
        },
        {
          "id": "5-2",
          "operator": "range",
          "value": 0.5,
          "valueMax": 1,
          "color": "#ffcc00",
          "description": "Moderate Debt"
        },
        {
          "id": "5-3",
          "operator": ">",
          "value": 1,
          "color": "#ff1a1a",
          "description": "High Debt"
        }
      ]
    },
    {
      "id": "6",
      "name": "Current ratio",
      "conditions": [
        {
          "id": "6-1",
          "operator": ">",
          "value": 1.5,
          "color": "#2fe980",
          "description": "Strong Liquidity"
        },
        {
          "id": "6-2",
          "operator": "range",
          "value": 1,
          "valueMax": 1.5,
          "color": "#ffcc00",
          "description": "Adequate"
        },
        {
          "id": "6-3",
          "operator": "<",
          "value": 1,
          "color": "#ff1a1a",
          "description": "Weak Liquidity"
        }
      ]
    },
    {
      "id": "7",
      "name": "ROCE",
      "conditions": [
        {
          "id": "7-1",
          "operator": ">",
          "value": 15,
          "color": "#2fe980",
          "description": "High Efficiency"
        },
        {
          "id": "7-2",
          "operator": "range",
          "value": 10,
          "valueMax": 15,
          "color": "#ffcc00",
          "description": "Moderate"
        },
        {
          "id": "7-3",
          "operator": "<",
          "value": 10,
          "color": "#ff1a1a",
          "description": "Low Efficiency"
        }
      ]
    },
    {
      "id": "8",
      "name": "Interest Coverage",
      "conditions": [
        {
          "id": "8-1",
          "operator": ">",
          "value": 5,
          "color": "#2fe980",
          "description": "Strong Coverage"
        },
        {
          "id": "8-2",
          "operator": "range",
          "value": 3,
          "valueMax": 5,
          "color": "#ffcc00",
          "description": "Adequate"
        },
        {
          "id": "8-3",
          "operator": "<",
          "value": 3,
          "color": "#ff1a1a",
          "description": "Weak Coverage"
        }
      ]
    },
    {
      "id": "9",
      "name": "Cash by market cap",
      "conditions": [
        {
          "id": "9-1",
          "operator": ">",
          "value": 0.2,
          "color": "#2fe980",
          "description": "High Cash Reserve"
        },
        {
          "id": "9-2",
          "operator": "range",
          "value": 0.1,
          "valueMax": 0.2,
          "color": "#ffcc00",
          "description": "Moderate Cash"
        },
        {
          "id": "9-3",
          "operator": "<",
          "value": 0.1,
          "color": "#ff1a1a",
          "description": "Low Cash"
        }
      ]
    },
    {
      "id": "10",
      "name": "EPS growth 5Years",
      "conditions": [
        {
          "id": "10-1",
          "operator": ">",
          "value": 10,
          "color": "#2fe980",
          "description": "Growing Earnings"
        },
        {
          "id": "10-2",
          "operator": "range",
          "value": 5,
          "valueMax": 10,
          "color": "#ffcc00",
          "description": "Stable Earnings"
        },
        {
          "id": "10-3",
          "operator": "<",
          "value": 5,
          "color": "#ff1a1a",
          "description": "Declining Earnings"
        }
      ]
    },
    {
      "id": "11",
      "name": "Pledged percentage",
      "conditions": [
        {
          "id": "11-1",
          "operator": "==",
          "value": 0,
          "color": "#2fe980",
          "description": "No Pledging"
        },
        {
          "id": "11-2",
          "operator": "range",
          "value": 0,
          "valueMax": 25,
          "color": "#ffcc00",
          "description": "Low Pledging"
        },
        {
          "id": "11-3",
          "operator": ">",
          "value": 25,
          "color": "#ff1a1a",
          "description": "High Pledging"
        }
      ]
    },
    {
      "id": "12",
      "name": "Avg Div Payout 3Yrs",
      "conditions": [
        {
          "id": "12-1",
          "operator": ">",
          "value": 70,
          "color": "#ff1a1a",
          "description": "Potentially Unsustainable"
        },
        {
          "id": "12-2",
          "operator": "range",
          "value": 50,
          "valueMax": 70,
          "color": "#ffcc00",
          "description": "Moderate Payout"
        },
        {
          "id": "12-3",
          "operator": "<",
          "value": 50,
          "color": "#2fe980",
          "description": "Conservative Payout"
        }
      ]
    },
    {
      "id": "13",
      "name": "Mar Cap",
      "aliases": [
        "Market Cap"
      ],
      "conditions": [
        {
          "id": "13-1",
          "operator": ">",
          "value": 10000,
          "color": "#bbdefb",
          "description": "Large Cap"
        },
        {
          "id": "13-2",
          "operator": "range",
          "value": 2000,
          "valueMax": 10000,
          "color": "#c8e6c9",
          "description": "Mid Cap"
        },
        {
          "id": "13-3",
          "operator": "<",
          "value": 2000,
          "color": "#ffcdd2",
          "description": "Small Cap"
        }
      ]
    },
    {
      "id": "14",
      "name": "ROCE 5Yr",
      "conditions": [
        {
          "id": "14-1",
          "operator": ">",
          "value": 15,
          "color": "#2fe980",
          "description": "Consistently High"
        },
        {
          "id": "14-2",
          "operator": "range",
          "value": 10,
          "valueMax": 15,
          "color": "#ffcc00",
          "description": "Stable"
        },
        {
          "id": "14-3",
          "operator": "<",
          "value": 10,
          "color": "#ff1a1a",
          "description": "Declining"
        }
      ]
    },
    {
      "id": "15",
      "name": "Dividend Prev Ann",
      "conditions": [
        {
          "id": "15-1",
          "operator": ">",
          "value": 0,
          "color": "#2fe980",
          "description": "Paid Dividend"
        },
        {
          "id": "15-2",
          "operator": "==",
          "value": 0,
          "color": "#ff1a1a",
          "description": "No Dividend"
        }
      ]
    }
  ],
  "Blue-Chip Stocks": [
    {
      "id": "1",
      "name": "Mar Cap",
      "aliases": [
        "Market Cap"
      ],
      "conditions": [
        {
          "id": "1-1",
          "operator": ">",
          "value": 100000,
          "color": "#2fe980",
          "description": "Mega Cap (>100K Cr)"
        },
        {
          "id": "1-2",
          "operator": "range",
          "value": 50000,
          "valueMax": 100000,
          "color": "#a5d6a7",
          "description": "Large Cap (50-100K Cr)"
        },
        {
          "id": "1-3",
          "operator": "range",
          "value": 20000,
          "valueMax": 50000,
          "color": "#ffcc00",
          "description": "Mid-Large Cap (20-50K Cr)"
        },
        {
          "id": "1-4",
          "operator": "<",
          "value": 20000,
          "color": "#ff1a1a",
          "description": "Not Blue-Chip (<20K Cr)"
        }
      ],
      "isExpanded": true
    },
    {
      "id": "2",
      "name": "ROCE 5Yr",
      "conditions": [
        {
          "id": "2-1",
          "operator": ">",
          "value": 20,
          "color": "#2fe980",
          "description": "Excellent (>20%)"
        },
        {
          "id": "2-2",
          "operator": "range",
          "value": 15,
          "valueMax": 20,
          "color": "#a5d6a7",
          "description": "Good (15-20%)"
        },
        {
          "id": "2-3",
          "operator": "range",
          "value": 10,
          "valueMax": 15,
          "color": "#ffcc00",
          "description": "Average (10-15%)"
        },
        {
          "id": "2-4",
          "operator": "<",
          "value": 10,
          "color": "#ff1a1a",
          "description": "Poor (<10%)"
        }
      ]
    },
    {
      "id": "3",
      "name": "Debt to equity",
      "conditions": [
        {
          "id": "3-1",
          "operator": "<",
          "value": 0.5,
          "color": "#2fe980",
          "description": "Low Debt (<0.5)"
        },
        {
          "id": "3-2",
          "operator": "range",
          "value": 0.5,
          "valueMax": 1,
          "color": "#a5d6a7",
          "description": "Moderate (0.5-1)"
        },
        {
          "id": "3-3",
          "operator": "range",
          "value": 1,
          "valueMax": 1.5,
          "color": "#ffcc00",
          "description": "High (1-1.5)"
        },
        {
          "id": "3-4",
          "operator": ">",
          "value": 1.5,
          "color": "#ff1a1a",
          "description": "Very High (>1.5)"
        }
      ]
    },
    {
      "id": "4",
      "name": "Current ratio",
      "conditions": [
        {
          "id": "4-1",
          "operator": ">",
          "value": 2,
          "color": "#2fe980",
          "description": "Strong (>2)"
        },
        {
          "id": "4-2",
          "operator": "range",
          "value": 1.5,
          "valueMax": 2,
          "color": "#a5d6a7",
          "description": "Good (1.5-2)"
        },
        {
          "id": "4-3",
          "operator": "range",
          "value": 1,
          "valueMax": 1.5,
          "color": "#ffcc00",
          "description": "Adequate (1-1.5)"
        },
        {
          "id": "4-4",
          "operator": "<",
          "value": 1,
          "color": "#ff1a1a",
          "description": "Weak (<1)"
        }
      ]
    },
    {
      "id": "5",
      "name": "Interest Coverage",
      "conditions": [
        {
          "id": "5-1",
          "operator": ">",
          "value": 8,
          "color": "#2fe980",
          "description": "Very Safe (>8x)"
        },
        {
          "id": "5-2",
          "operator": "range",
          "value": 5,
          "valueMax": 8,
          "color": "#a5d6a7",
          "description": "Safe (5-8x)"
        },
        {
          "id": "5-3",
          "operator": "range",
          "value": 3,
          "valueMax": 5,
          "color": "#ffcc00",
          "description": "Moderate (3-5x)"
        },
        {
          "id": "5-4",
          "operator": "<",
          "value": 3,
          "color": "#ff1a1a",
          "description": "Risky (<3x)"
        }
      ]
    },
    {
      "id": "6",
      "name": "Pledged percentage",
      "conditions": [
        {
          "id": "6-1",
          "operator": "==",
          "value": 0,
          "color": "#2fe980",
          "description": "Zero Pledge"
        },
        {
          "id": "6-2",
          "operator": "range",
          "value": 0,
          "valueMax": 10,
          "color": "#a5d6a7",
          "description": "Low (<10%)"
        },
        {
          "id": "6-3",
          "operator": "range",
          "value": 10,
          "valueMax": 25,
          "color": "#ffcc00",
          "description": "Moderate (10-25%)"
        },
        {
          "id": "6-4",
          "operator": ">",
          "value": 25,
          "color": "#ff1a1a",
          "description": "High (>25%)"
        }
      ]
    },
    {
      "id": "7",
      "name": "Promoter holding",
      "conditions": [
        {
          "id": "7-1",
          "operator": ">",
          "value": 50,
          "color": "#2fe980",
          "description": "High (>50%)"
        },
        {
          "id": "7-2",
          "operator": "range",
          "value": 40,
          "valueMax": 50,
          "color": "#a5d6a7",
          "description": "Good (40-50%)"
        },
        {
          "id": "7-3",
          "operator": "range",
          "value": 30,
          "valueMax": 40,
          "color": "#ffcc00",
          "description": "Moderate (30-40%)"
        },
        {
          "id": "7-4",
          "operator": "<",
          "value": 30,
          "color": "#ff1a1a",
          "description": "Low (<30%)"
        }
      ]
    },
    {
      "id": "8",
      "name": "Dividend yield",
      "conditions": [
        {
          "id": "8-1",
          "operator": ">",
          "value": 4,
          "color": "#2fe980",
          "description": "High (>4%)"
        },
        {
          "id": "8-2",
          "operator": "range",
          "value": 2,
          "valueMax": 4,
          "color": "#a5d6a7",
          "description": "Moderate (2-4%)"
        },
        {
          "id": "8-3",
          "operator": "range",
          "value": 0,
          "valueMax": 2,
          "color": "#ffcc00",
          "description": "Low (0-2%)"
        },
        {
          "id": "8-4",
          "operator": "==",
          "value": 0,
          "color": "#ff1a1a",
          "description": "No Dividend"
        }
      ]
    },
    {
      "id": "9",
      "name": "Profit growth",
      "conditions": [
        {
          "id": "9-1",
          "operator": ">",
          "value": 15,
          "color": "#2fe980",
          "description": "High Growth (>15%)"
        },
        {
          "id": "9-2",
          "operator": "range",
          "value": 10,
          "valueMax": 15,
          "color": "#a5d6a7",
          "description": "Good (10-15%)"
        },
        {
          "id": "9-3",
          "operator": "range",
          "value": 5,
          "valueMax": 10,
          "color": "#ffcc00",
          "description": "Moderate (5-10%)"
        },
        {
          "id": "9-4",
          "operator": "<",
          "value": 5,
          "color": "#ff1a1a",
          "description": "Low (<5%)"
        }
      ]
    },
    {
      "id": "10",
      "name": "Price to Earning",
      "aliases": [
        "Stock P/E"
      ],
      "conditions": [
        {
          "id": "10-1",
          "operator": "<",
          "value": 20,
          "color": "#2fe980",
          "description": "Undervalued (<20)"
        },
        {
          "id": "10-2",
          "operator": "range",
          "value": 20,
          "valueMax": 30,
          "color": "#a5d6a7",
          "description": "Fair (20-30)"
        },
        {
          "id": "10-3",
          "operator": "range",
          "value": 30,
          "valueMax": 40,
          "color": "#ffcc00",
          "description": "Overvalued (30-40)"
        },
        {
          "id": "10-4",
          "operator": ">",
          "value": 40,
          "color": "#ff1a1a",
          "description": "Highly Overvalued (>40)"
        }
      ]
    },
    {
      "id": "11",
      "name": "Altman Z Score",
      "conditions": [
        {
          "id": "11-1",
          "operator": ">",
          "value": 3,
          "color": "#2fe980",
          "description": "Safe (>3)"
        },
        {
          "id": "11-2",
          "operator": "range",
          "value": 2.5,
          "valueMax": 3,
          "color": "#a5d6a7",
          "description": "Stable (2.5-3)"
        },
        {
          "id": "11-3",
          "operator": "range",
          "value": 1.8,
          "valueMax": 2.5,
          "color": "#ffcc00",
          "description": "Caution (1.8-2.5)"
        },
        {
          "id": "11-4",
          "operator": "<",
          "value": 1.8,
          "color": "#ff1a1a",
          "description": "Distress (<1.8)"
        }
      ]
    },
    {
      "id": "12",
      "name": "Free Cash Flow",
      "conditions": [
        {
          "id": "12-1",
          "operator": ">",
          "value": 1000,
          "color": "#2fe980",
          "description": "Strong (>1000 Cr)"
        },
        {
          "id": "12-2",
          "operator": "range",
          "value": 500,
          "valueMax": 1000,
          "color": "#a5d6a7",
          "description": "Good (500-1000 Cr)"
        },
        {
          "id": "12-3",
          "operator": "range",
          "value": 0,
          "valueMax": 500,
          "color": "#ffcc00",
          "description": "Moderate (0-500 Cr)"
        },
        {
          "id": "12-4",
          "operator": "<",
          "value": 0,
          "color": "#ff1a1a",
          "description": "Negative (<0)"
        }
      ]
    },
    {
      "id": "13",
      "name": "ROE 5Yr",
      "conditions": [
        {
          "id": "13-1",
          "operator": ">",
          "value": 20,
          "color": "#2fe980",
          "description": "Excellent (>20%)"
        },
        {
          "id": "13-2",
          "operator": "range",
          "value": 15,
          "valueMax": 20,
          "color": "#a5d6a7",
          "description": "Good (15-20%)"
        },
        {
          "id": "13-3",
          "operator": "range",
          "value": 10,
          "valueMax": 15,
          "color": "#ffcc00",
          "description": "Average (10-15%)"
        },
        {
          "id": "13-4",
          "operator": "<",
          "value": 10,
          "color": "#ff1a1a",
          "description": "Poor (<10%)"
        }
      ]
    },
    {
      "id": "14",
      "name": "Sales growth",
      "conditions": [
        {
          "id": "14-1",
          "operator": ">",
          "value": 15,
          "color": "#2fe980",
          "description": "High Growth (>15%)"
        },
        {
          "id": "14-2",
          "operator": "range",
          "value": 10,
          "valueMax": 15,
          "color": "#a5d6a7",
          "description": "Good (10-15%)"
        },
        {
          "id": "14-3",
          "operator": "range",
          "value": 5,
          "valueMax": 10,
          "color": "#ffcc00",
          "description": "Moderate (5-10%)"
        },
        {
          "id": "14-4",
          "operator": "<",
          "value": 5,
          "color": "#ff1a1a",
          "description": "Low (<5%)"
        }
      ]
    },
    {
      "id": "15",
      "name": "Is not SME",
      "conditions": [
        {
          "id": "15-1",
          "operator": "==",
          "value": 1,
          "color": "#2fe980",
          "description": "Mainboard Listed"
        },
        {
          "id": "15-2",
          "operator": "==",
          "value": 0,
          "color": "#ff1a1a",
          "description": "SME Listed"
        }
      ]
    }
  ],
  "Small-Cap Stocks": [
    {
      "id": "1",
      "name": "Mar Cap",
      "aliases": [
        "Market Cap"
      ],
      "conditions": [
        {
          "id": "1-1",
          "operator": "<",
          "value": 5000,
          "color": "#2fe980",
          "description": "Small Cap (<5K Cr)"
        },
        {
          "id": "1-2",
          "operator": "range",
          "value": 5000,
          "valueMax": 10000,
          "color": "#a5d6a7",
          "description": "Mid-Small Cap (5-10K Cr)"
        },
        {
          "id": "1-3",
          "operator": "range",
          "value": 10000,
          "valueMax": 20000,
          "color": "#ffcc00",
          "description": "Approaching Mid Cap (10-20K Cr)"
        },
        {
          "id": "1-4",
          "operator": ">",
          "value": 20000,
          "color": "#ff1a1a",
          "description": "Not Small Cap (>20K Cr)"
        }
      ],
      "isExpanded": true
    },
    {
      "id": "2",
      "name": "Sales growth",
      "conditions": [
        {
          "id": "2-1",
          "operator": ">",
          "value": 25,
          "color": "#2fe980",
          "description": "Hyper Growth (>25%)"
        },
        {
          "id": "2-2",
          "operator": "range",
          "value": 15,
          "valueMax": 25,
          "color": "#a5d6a7",
          "description": "High Growth (15-25%)"
        },
        {
          "id": "2-3",
          "operator": "range",
          "value": 5,
          "valueMax": 15,
          "color": "#ffcc00",
          "description": "Moderate (5-15%)"
        },
        {
          "id": "2-4",
          "operator": "<",
          "value": 5,
          "color": "#ff1a1a",
          "description": "Low Growth (<5%)"
        }
      ]
    },
    {
      "id": "3",
      "name": "Profit growth",
      "conditions": [
        {
          "id": "3-1",
          "operator": ">",
          "value": 30,
          "color": "#2fe980",
          "description": "Exceptional (>30%)"
        },
        {
          "id": "3-2",
          "operator": "range",
          "value": 20,
          "valueMax": 30,
          "color": "#a5d6a7",
          "description": "Strong (20-30%)"
        },
        {
          "id": "3-3",
          "operator": "range",
          "value": 10,
          "valueMax": 20,
          "color": "#ffcc00",
          "description": "Moderate (10-20%)"
        },
        {
          "id": "3-4",
          "operator": "<",
          "value": 10,
          "color": "#ff1a1a",
          "description": "Weak (<10%)"
        }
      ]
    },
    {
      "id": "4",
      "name": "ROCE",
      "conditions": [
        {
          "id": "4-1",
          "operator": ">",
          "value": 25,
          "color": "#2fe980",
          "description": "Excellent (>25%)"
        },
        {
          "id": "4-2",
          "operator": "range",
          "value": 18,
          "valueMax": 25,
          "color": "#a5d6a7",
          "description": "Good (18-25%)"
        },
        {
          "id": "4-3",
          "operator": "range",
          "value": 12,
          "valueMax": 18,
          "color": "#ffcc00",
          "description": "Average (12-18%)"
        },
        {
          "id": "4-4",
          "operator": "<",
          "value": 12,
          "color": "#ff1a1a",
          "description": "Poor (<12%)"
        }
      ]
    },
    {
      "id": "5",
      "name": "Debt to equity",
      "conditions": [
        {
          "id": "5-1",
          "operator": "<",
          "value": 0.3,
          "color": "#2fe980",
          "description": "Very Low (<0.3)"
        },
        {
          "id": "5-2",
          "operator": "range",
          "value": 0.3,
          "valueMax": 0.75,
          "color": "#a5d6a7",
          "description": "Manageable (0.3-0.75)"
        },
        {
          "id": "5-3",
          "operator": "range",
          "value": 0.75,
          "valueMax": 1.25,
          "color": "#ffcc00",
          "description": "High (0.75-1.25)"
        },
        {
          "id": "5-4",
          "operator": ">",
          "value": 1.25,
          "color": "#ff1a1a",
          "description": "Very High (>1.25)"
        }
      ]
    },
    {
      "id": "6",
      "name": "Promoter holding",
      "conditions": [
        {
          "id": "6-1",
          "operator": ">",
          "value": 50,
          "color": "#2fe980",
          "description": "High Conviction (>50%)"
        },
        {
          "id": "6-2",
          "operator": "range",
          "value": 40,
          "valueMax": 50,
          "color": "#a5d6a7",
          "description": "Strong (40-50%)"
        },
        {
          "id": "6-3",
          "operator": "range",
          "value": 30,
          "valueMax": 40,
          "color": "#ffcc00",
          "description": "Moderate (30-40%)"
        },
        {
          "id": "6-4",
          "operator": "<",
          "value": 30,
          "color": "#ff1a1a",
          "description": "Low (<30%)"
        }
      ]
    },
    {
      "id": "7",
      "name": "Pledged percentage",
      "conditions": [
        {
          "id": "7-1",
          "operator": "==",
          "value": 0,
          "color": "#2fe980",
          "description": "Zero Pledge"
        },
        {
          "id": "7-2",
          "operator": "range",
          "value": 0,
          "valueMax": 15,
          "color": "#a5d6a7",
          "description": "Low (<15%)"
        },
        {
          "id": "7-3",
          "operator": "range",
          "value": 15,
          "valueMax": 30,
          "color": "#ffcc00",
          "description": "Moderate (15-30%)"
        },
        {
          "id": "7-4",
          "operator": ">",
          "value": 30,
          "color": "#ff1a1a",
          "description": "High (>30%)"
        }
      ]
    },
    {
      "id": "8",
      "name": "Price to Sales",
      "conditions": [
        {
          "id": "8-1",
          "operator": "<",
          "value": 2,
          "color": "#2fe980",
          "description": "Undervalued (<2)"
        },
        {
          "id": "8-2",
          "operator": "range",
          "value": 2,
          "valueMax": 4,
          "color": "#a5d6a7",
          "description": "Fair (2-4)"
        },
        {
          "id": "8-3",
          "operator": "range",
          "value": 4,
          "valueMax": 6,
          "color": "#ffcc00",
          "description": "Expensive (4-6)"
        },
        {
          "id": "8-4",
          "operator": ">",
          "value": 6,
          "color": "#ff1a1a",
          "description": "Very Expensive (>6)"
        }
      ]
    },
    {
      "id": "9",
      "name": "Qtr Sales Var",
      "conditions": [
        {
          "id": "9-1",
          "operator": ">",
          "value": 40,
          "color": "#2fe980",
          "description": "Rapid Growth (>40%)"
        },
        {
          "id": "9-2",
          "operator": "range",
          "value": 25,
          "valueMax": 40,
          "color": "#a5d6a7",
          "description": "Strong (25-40%)"
        },
        {
          "id": "9-3",
          "operator": "range",
          "value": 10,
          "valueMax": 25,
          "color": "#ffcc00",
          "description": "Moderate (10-25%)"
        },
        {
          "id": "9-4",
          "operator": "<",
          "value": 10,
          "color": "#ff1a1a",
          "description": "Weak (<10%)"
        }
      ]
    },
    {
      "id": "10",
      "name": "Qtr Profit Var",
      "conditions": [
        {
          "id": "10-1",
          "operator": ">",
          "value": 50,
          "color": "#2fe980",
          "description": "Exceptional (>50%)"
        },
        {
          "id": "10-2",
          "operator": "range",
          "value": 30,
          "valueMax": 50,
          "color": "#a5d6a7",
          "description": "Strong (30-50%)"
        },
        {
          "id": "10-3",
          "operator": "range",
          "value": 15,
          "valueMax": 30,
          "color": "#ffcc00",
          "description": "Moderate (15-30%)"
        },
        {
          "id": "10-4",
          "operator": "<",
          "value": 15,
          "color": "#ff1a1a",
          "description": "Weak (<15%)"
        }
      ]
    },
    {
      "id": "11",
      "name": "Cash by market cap",
      "conditions": [
        {
          "id": "11-1",
          "operator": ">",
          "value": 0.25,
          "color": "#2fe980",
          "description": "Strong Cash (>25%)"
        },
        {
          "id": "11-2",
          "operator": "range",
          "value": 0.1,
          "valueMax": 0.25,
          "color": "#a5d6a7",
          "description": "Adequate (10-25%)"
        },
        {
          "id": "11-3",
          "operator": "range",
          "value": 0,
          "valueMax": 0.1,
          "color": "#ffcc00",
          "description": "Low (0-10%)"
        },
        {
          "id": "11-4",
          "operator": "<",
          "value": 0,
          "color": "#ff1a1a",
          "description": "Negative"
        }
      ]
    },
    {
      "id": "12",
      "name": "PEG Ratio",
      "conditions": [
        {
          "id": "12-1",
          "operator": "<",
          "value": 0.75,
          "color": "#2fe980",
          "description": "Undervalued (<0.75)"
        },
        {
          "id": "12-2",
          "operator": "range",
          "value": 0.75,
          "valueMax": 1.25,
          "color": "#a5d6a7",
          "description": "Fair (0.75-1.25)"
        },
        {
          "id": "12-3",
          "operator": "range",
          "value": 1.25,
          "valueMax": 2,
          "color": "#ffcc00",
          "description": "Overvalued (1.25-2)"
        },
        {
          "id": "12-4",
          "operator": ">",
          "value": 2,
          "color": "#ff1a1a",
          "description": "Highly Overvalued (>2)"
        }
      ]
    },
    {
      "id": "13",
      "name": "Return on equity",
      "conditions": [
        {
          "id": "13-1",
          "operator": ">",
          "value": 20,
          "color": "#2fe980",
          "description": "Excellent (>20%)"
        },
        {
          "id": "13-2",
          "operator": "range",
          "value": 15,
          "valueMax": 20,
          "color": "#a5d6a7",
          "description": "Good (15-20%)"
        },
        {
          "id": "13-3",
          "operator": "range",
          "value": 10,
          "valueMax": 15,
          "color": "#ffcc00",
          "description": "Average (10-15%)"
        },
        {
          "id": "13-4",
          "operator": "<",
          "value": 10,
          "color": "#ff1a1a",
          "description": "Poor (<10%)"
        }
      ]
    },
    {
      "id": "14",
      "name": "CMP / FCF",
      "conditions": [
        {
          "id": "14-1",
          "operator": "<",
          "value": 15,
          "color": "#2fe980",
          "description": "Undervalued (<15)"
        },
        {
          "id": "14-2",
          "operator": "range",
          "value": 15,
          "valueMax": 30,
          "color": "#a5d6a7",
          "description": "Fair (15-30)"
        },
        {
          "id": "14-3",
          "operator": "range",
          "value": 30,
          "valueMax": 50,
          "color": "#ffcc00",
          "description": "Overvalued (30-50)"
        },
        {
          "id": "14-4",
          "operator": ">",
          "value": 50,
          "color": "#ff1a1a",
          "description": "Highly Overvalued (>50)"
        }
      ]
    },
    {
      "id": "15",
      "name": "Is SME",
      "conditions": [
        {
          "id": "15-1",
          "operator": "==",
          "value": 1,
          "color": "#ffcc00",
          "description": "SME Listed (Higher Risk)"
        },
        {
          "id": "15-2",
          "operator": "==",
          "value": 0,
          "color": "#a5d6a7",
          "description": "Mainboard Listed"
        }
      ]
    }
  ],
  // "Momentum Stocks":

}