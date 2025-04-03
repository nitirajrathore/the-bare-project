export const presets = {
  "Growth Stock": [
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
      "name": "Stock P/E",
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
  ]
}