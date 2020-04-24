# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %%
import pyodbc
import numpy as np
import pandas as pd
import sys

# data = pd.read_excel(r'C:\Users\Phyu\Downloads\Testing data (Phyu) (1).xlsx')
data = pd.ExcelFile(sys.argv[1])
#print(sys.argv[1])
sys.stdout.flush()

# %%


# %%
print(data.sheet_names)


# %%
data.parse(sheetname='Part Master', skiprows=0).head(
    10)  # get Part Master Sheet names


# %%
tabnames = data.sheet_names


# %%
#print(tabnames[0])


# %%
i = 0
# df = data.parse(sheetname=tabnames[i], skiprows=5,skipcolumns = 2) #first sheet, skip 5 rows, skip 2 columns
df = data.parse(sheetname=tabnames[i])  # build dataframe of first sheet
#df = df.dropna()


# %%
#print(df)


# %%
df_str = df.applymap(str)
#print(df_str)


# %%
# get row and column value if the cell values is equal to SKU_CODE
idx = df_str.apply(lambda x: x.str.contains('SKU_CODE'))

col_idx = []
for i in range(df.shape[1]):
    col_idx.append(df.iloc[:, i][idx.iloc[:, i]].index.tolist())


out = []
cnt = 0
for i in col_idx:
    for j in range(len(i)):
        out.append((i[j], cnt))
    cnt += 1
out


# %%
# get row and column value if the cell values is equal to SKU_Name
idx = df_str.apply(lambda x: x.str.contains('SKU_Name'))

col_idx = []
for i in range(df.shape[1]):
    col_idx.append(df.iloc[:, i][idx.iloc[:, i]].index.tolist())


out = []
cnt = 0
for i in col_idx:
    for j in range(len(i)):
        out.append((i[j], cnt))
    cnt += 1
out


# %%
#print(out[0][0])
#print(out[0][1])


# %%


# %%
i = 0
# first sheet, skip 5 rows, skip 2 columns
df_strip = data.parse(
    sheetname=tabnames[i], skiprows=out[0][0]+1, skipcolumns=3)
#print(df_strip)


# %%

cols1 = list(df_strip.columns)
#print(cols1)


# %%
# drop those columns with Unnamed
df_strip = df_strip.drop(df_strip.filter(regex='Unnamed').columns, axis=1)
#print(df_strip)


# %%
df_strip.to_excel("output.xlsx",
                  sheet_name='Part Master')


# %%
conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=DESKTOP-CCDK3QN;'
                      'Database=Inventory;'
                      'Trusted_Connection=yes;')

cursor = conn.cursor()
cursor.execute("Select * FROM Inventory.dbo.TestWriteFromPython")

#for row in cursor:
    #print(row)


# %%
SKU1002 = 'SKU1002'
SKU1002Name = 'SKU1002Name'
SKU10002 = 'SKU10002'
cursor.execute("Insert into TestWriteFromPython Values('" +
               SKU1002 + "','" + SKU1002Name + "','" + SKU10002 + "')")
conn.commit()
cursor.execute("Select * FROM Inventory.dbo.TestWriteFromPython")


# for row in cursor:
    # print(row)


# %%
cols1 = list(df_strip.columns)
# print(cols1)


# %%
# drop those columns with Unnamed
#print(df_strip.filter(regex='SKU_CODE').columns)


# %%




