filename = input('Filename: ')
print('Enter file contents. When complete, enter {{END}}')
line = ''
f = open(filename, 'w')
while True:
    line = input()
    if line.find('{{END}}') != -1:
        f.write(line.replace('{{END}}', ''))
        break
    else:
        f.write(line+'\r\n')
f.close

