from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parent
W, H = 760, 1320
NAVY = '#344356'
INK = '#25332c'
MUTED = '#728078'
LINE = '#dfe5e0'
PAPER = '#f6f7f4'
GREEN = '#176b54'
PALE = '#edf5f0'
RED = '#b66363'
PALE_RED = '#fbf0ef'

FONT = 'C:/Windows/Fonts/arial.ttf'
BOLD = 'C:/Windows/Fonts/arialbd.ttf'

def font(size, bold=False):
    return ImageFont.truetype(BOLD if bold else FONT, size)

def rounded(draw, box, fill, outline=LINE, radius=18, width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)

def label(draw, xy, text, size=22, color=INK, bold=False):
    draw.text(xy, text, fill=color, font=font(size, bold))

def shell(title, number):
    im=Image.new('RGB',(W,H),PAPER); d=ImageDraw.Draw(im)
    rounded(d,(42,28,718,1290),'#ffffff','#cdd6cf',42,4)
    label(d,(78,57),'9:41',20,NAVY,True); label(d,(595,57),'●  ●  ▰',17,NAVY,True)
    d.line((67,100,693,100),fill=LINE,width=2)
    rounded(d,(76,120,128,172),GREEN,GREEN,13,1); label(d,(92,126),'u',34,'#ffffff',True)
    label(d,(145,121),'myUMM',24,NAVY,True); label(d,(145,150),'PEMROGRAMAN KRS',13,MUTED,True)
    label(d,(80,202),f'Layar {number} dari 5',15,GREEN,True)
    label(d,(80,236),title,32,NAVY,True)
    d.line((80,290,680,290),fill=LINE,width=2)
    return im,d

def button(d, y, text, primary=True):
    fill=GREEN if primary else '#ffffff'; outline=GREEN if primary else LINE; fg='#ffffff' if primary else GREEN
    rounded(d,(82,y,678,y+72),fill,outline,14,2); label(d,(112,y+21),text,21,fg,True); label(d,(625,y+19),'→',28,fg,True)

def pill(d,x,y,text,active=False):
    box=d.textbbox((0,0),text,font=font(16,True)); width=box[2]+34
    rounded(d,(x,y,x+width,y+42),PALE if active else '#ffffff',GREEN if active else LINE,12,2)
    label(d,(x+16,y+11),text,16,GREEN if active else MUTED,True)
    return x+width+9

def screen1():
    im,d=shell('Beranda KRS',1)
    label(d,(82,330),'PORTAL AKADEMIK · 2026/2027',15,MUTED,True)
    label(d,(82,372),'Selamat datang,',34,NAVY,True); label(d,(82,415),'Mahasiswa UMM.',34,GREEN,True)
    label(d,(82,475),'Susun KRS dengan lebih tenang. Jadwal',19,MUTED); label(d,(82,505),'bentrok akan diperiksa otomatis.',19,MUTED)
    rounded(d,(80,563,680,820),'#ffffff',LINE,20,2)
    label(d,(108,593),'PEMROGRAMAN KRS',15,GREEN,True); label(d,(108,630),'Semester ganjil',26,NAVY,True); label(d,(108,665),'2026/2027',26,NAVY,True)
    label(d,(108,719),'Periode berakhir 29 November 2026',17,MUTED)
    button(d,754,'Mulai susun KRS')
    rounded(d,(80,856,680,1118),'#f8faf7',LINE,18,2)
    label(d,(108,883),'PERSIAPAN KRS',15,MUTED,True)
    for y,t in [(927,'[x]  Semester aktif · Ganjil 2026/2027'),(983,'[x]  Batas pengambilan · 24 SKS'),(1039,'3   Pilih kelas · Belum dimulai')]:
        label(d,(108,y),t,18,GREEN if t.startswith('✓') else MUTED,True)
    label(d,(82,1165),'Data semester pada wireframe adalah contoh.',15,MUTED)
    return im

def screen2():
    im,d=shell('Informasi KRS',2)
    label(d,(82,320),'LANGKAH 1 DARI 4',15,MUTED,True)
    rounded(d,(80,368,680,645),'#ffffff',LINE,18,2)
    label(d,(108,398),'SEMESTER BERJALAN',15,GREEN,True); label(d,(108,437),'Ganjil 2026/2027',27,NAVY,True)
    d.line((108,485,652,485),fill=LINE,width=2)
    label(d,(108,507),'Periode pemrograman',17,MUTED); label(d,(420,507),'23–29 Nov 2026',17,INK,True)
    label(d,(108,553),'Batas pengambilan',17,MUTED); label(d,(510,553),'24 SKS',17,INK,True)
    label(d,(108,599),'Beban per mata kuliah',17,MUTED); label(d,(543,599),'3 SKS',17,INK,True)
    rounded(d,(80,674,680,1008),PALE,'#dce9df',18,2)
    label(d,(108,704),'Panduan singkat',24,NAVY,True)
    for i,t in enumerate(['Pilih penjurusan yang sesuai.','Periksa waktu aktual dan kuota.','Kelas bentrok ditandai otomatis.','Tinjau jadwal sebelum selesai.']):
        y=759+i*50; rounded(d,(108,y,138,y+30),'#ffffff','#c5d6ca',9,1); label(d,(116,y+4),str(i+1),15,GREEN,True); label(d,(153,y+3),t,17,INK)
    button(d,1050,'Pilih mata kuliah')
    return im

def screen3():
    im,d=shell('Pilih kelas',3)
    label(d,(82,320),'LANGKAH 2 DARI 4',15,MUTED,True)
    rounded(d,(80,364,680,420),'#ffffff',LINE,12,2); label(d,(104,380),'⌕  Cari nama atau kode mata kuliah',17,MUTED)
    pill(d,82,437,'Semua',True); pill(d,204,437,'RPL'); pill(d,294,437,'Data Science')
    label(d,(82,502),'MATA KULIAH TERSEDIA',14,MUTED,True)
    def card(y,code,name,day,time,status,color=GREEN):
        rounded(d,(80,y,680,y+150),'#ffffff' if color!=RED else PALE_RED,LINE if color!=RED else '#efdbd9',15,2)
        label(d,(102,y+15),code+' · 3 SKS',14,MUTED,True); label(d,(102,y+42),name,18,NAVY,True)
        label(d,(102,y+77),day+' · '+time+' · GKB IV',15,MUTED)
        label(d,(102,y+106),'RPL · 8 kursi tersisa',14,MUTED)
        rounded(d,(516,y+50,653,y+96),PALE_RED if color==RED else PALE,color,10,1)
        label(d,(529,y+64),status,15,color,True)
    card(535,'IF301-A','Interaksi Manusia dan Komputer','Senin','08.00–10.00','Dipilih')
    card(698,'IF302-A','Rekayasa Kebutuhan Perangkat Lunak','Senin','09.00–11.00','Bentrok',RED)
    label(d,(102,828),'!  Bentrok dengan IF301-A yang sudah dipilih.',14,RED,True)
    card(874,'IF301-B','Interaksi Manusia dan Komputer','Selasa','08.00–10.00','+ Pilih')
    rounded(d,(80,1050,680,1147),'#f0f7f2','#dfe9e1',14,2)
    label(d,(104,1065),'Ringkasan · 1 kelas · 3 SKS',17,GREEN,True); label(d,(104,1095),'Tidak ada jadwal bentrok',14,MUTED)
    button(d,1166,'Tinjau jadwal')
    return im

def screen4():
    im,d=shell('Tinjau jadwal',4)
    label(d,(82,320),'LANGKAH 3 DARI 4',15,MUTED,True)
    label(d,(82,359),'Jadwal mingguan',25,NAVY,True); label(d,(82,395),'Semester ganjil 2026/2027',16,MUTED)
    rounded(d,(80,433,680,801),'#ffffff',LINE,16,2)
    cols=['Senin','Selasa','Rabu','Kamis','Jumat']; start=96
    for i,day in enumerate(cols):
        x=start+i*116; d.line((x,465,x+100,465),fill=LINE,width=1); label(d,(x,446),day[:3],13,NAVY,True)
        if day=='Selasa':
            rounded(d,(x,487,x+100,686),PALE,'#a7c6af',9,1)
            label(d,(x+7,499),'08.00',13,GREEN,True); label(d,(x+7,523),'10.00',13,GREEN,True)
            label(d,(x+7,556),'Interaksi',12,INK,True); label(d,(x+7,578),'Manusia &',12,INK); label(d,(x+7,600),'Komputer',12,INK)
            label(d,(x+7,646),'IF301-B',11,MUTED)
        else:
            rounded(d,(x,487,x+100,686),'#fafbfa','#eef0ee',9,1); label(d,(x+10,560),'Kosong',12,MUTED)
    rounded(d,(80,829,680,947),PALE,'#dce9df',14,2)
    label(d,(104,847),'Jadwal tidak bentrok',18,GREEN,True); label(d,(104,882),'Semua kelas sudah diperiksa berdasarkan hari dan jam.',14,MUTED)
    rounded(d,(80,975,680,1092),'#ffffff',LINE,14,2)
    label(d,(104,995),'1 kelas dipilih',17,NAVY,True); label(d,(104,1028),'Interaksi Manusia dan Komputer · IF301-B',14,MUTED); label(d,(104,1056),'Total beban studi',13,MUTED); label(d,(555,1056),'3 SKS',14,NAVY,True)
    button(d,1132,'Selesaikan simulasi')
    return im

def screen5():
    im,d=shell('Hasil simulasi',5)
    rounded(d,(322,337,438,453),PALE,'#dce9df',58,2)
    d.line((352,396,375,419),fill=GREEN,width=11); d.line((375,419,412,371),fill=GREEN,width=11)
    label(d,(215,491),'SIMULASI SELESAI',16,GREEN,True)
    label(d,(164,537),'Jadwalmu sudah siap',31,NAVY,True); label(d,(249,579),'untuk ditinjau.',31,GREEN,True)
    label(d,(131,643),'Kelas pilihan tidak memiliki jadwal yang',19,MUTED); label(d,(249,672),'bertabrakan.',19,MUTED)
    rounded(d,(80,736,680,932),'#ffffff',LINE,18,2)
    label(d,(108,766),'RINGKASAN SIMULASI',14,MUTED,True)
    label(d,(108,811),'Mata kuliah',15,MUTED); label(d,(486,811),'1 kelas',17,NAVY,True)
    label(d,(108,851),'Total beban',15,MUTED); label(d,(500,851),'3 SKS',17,NAVY,True)
    label(d,(108,891),'Status jadwal',15,MUTED); label(d,(435,891),'Tidak bentrok',16,GREEN,True)
    rounded(d,(80,957,680,1052),'#f4f6f3','#e8ece8',14,2)
    label(d,(103,978),'Simulasi ini tidak mengirim KRS ke sistem kampus.',14,MUTED)
    button(d,1082,'Kembali ke beranda')
    return im

screens=[screen1(),screen2(),screen3(),screen4(),screen5()]
for i,im in enumerate(screens,1):
    im.save(OUT/f'screen-{i:02}.png',optimize=True)

thumbs=[]
for im in screens:
    t=im.copy(); t.thumbnail((210,365)); thumbs.append(t)
overview=Image.new('RGB',(5*230+40,410),'#e9ede9')
od=ImageDraw.Draw(overview)
for i,t in enumerate(thumbs):
    x=20+i*230; overview.paste(t,(x,18)); label(od,(x+60,384),f'Layar {i+1}',16,NAVY,True)
overview.save(OUT/'overview.png',optimize=True)
