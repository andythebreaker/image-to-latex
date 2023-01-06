# opening the file in read mode
my_file = open("untitled.txt", "r")
  
# reading the file
data = my_file.read()
  
# replacing end of line('/n') with ' ' and
# splitting the text it further when '.' is seen.
data_into_list = data.split("\n")
  
# printing the data
print(data_into_list)
my_file.close()
import torch
from torch.utils.data import Dataset, DataLoader, random_split
b=torch.as_tensor(a)
print(b)
x=round(len(a)*0.1)
y=round(len(a)*0.1)
z=len(a)-x-y
print(x)
print(y)
print(z)
c=random_split(b, [x,y,z], generator=torch.Generator().manual_seed(42))
m = DataLoader(c[0], batch_size=1, num_workers=0, shuffle=False)
n = DataLoader(c[1], batch_size=1, num_workers=0, shuffle=False)
o = DataLoader(c[2], batch_size=1, num_workers=0, shuffle=False)
it1=iter(m)
it2=iter(n)
it3=iter(o)
w1=[]
w2=[]
w3=[]
for w0 in it1:
    w1.append((w0.tolist())[0])
for w0 in it2:
    w2.append((w0.tolist())[0])
for w0 in it3:
    w3.append((w0.tolist())[0])
print(w1)
print(w2)
print(w3)
# list of names
names = ['Jessa', 'Eric', 'Bob']
print(len(names))
# open file in write mode
varidx=0
with open('v.txt', 'w') as fp:
    for item in names:
        # write each item on a new line
        fp.write("%s" % item)
        varidx=varidx+1
        if(varidx<len(names)):
            print(varidx)
            fp.write("\n")
    print('Done')