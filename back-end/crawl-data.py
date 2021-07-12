"""
pip install requests
pip install Pillow
pip install -–upgrade pip

pip install beautifulsoup4 // tach data

pip install cssutils
"""

import requests
import cssutils
from bs4 import BeautifulSoup
response = requests.get("https://giayxshop.vn/danh-muc/giay-nike/")
# <Response [200]>
# print(response.content)

soup = BeautifulSoup(response.content, "html.parser")
#print(soup)

paren = soup.findAll('h3', class_='woocommerce-loop-product__title')
#print(paren)

links = [link.find('a').attrs["href"] for link in paren]
# print(len(links))
# print((links))

for link in links:
	# print(link)
	responseDetail 		= requests.get(link)
	soupDetail 				= BeautifulSoup(responseDetail.content, "html.parser")

	parenListImage			= soupDetail.select("div.woocommerce-product-gallery--with-images div.woo-variation-gallery-wrapper")
	# print ("cmmm " + str(parenListImage))
	# for img in  + aaaa :
	# 	# break
	# 	print("image: " + str(img['src']))


	parenDisccountDetail	= soupDetail.findAll('span', class_='ribbon')
	textDisccount			= parenDisccountDetail[0].text
	# print("giảm giá: " + (textDisccount))
	cutStringDisccount				= int(''.join(filter(str.isdigit, textDisccount)))
	if cutStringDisccount != None:
		print("giảm giá sản phẩm: " + str(cutStringDisccount))

	parenName				= soupDetail.find('h1', class_='product_title entry-title')		
	print("tên sản phẩm: " + str(parenName.text))

	parenShortDes			= soupDetail.select_one('div.woocommerce-product-details__short-description p')
	if parenShortDes != None:
		print("short des: " + str(parenShortDes.text))

	parenPrice				= soupDetail.find('span', class_='woocommerce-Price-amount amount')
	cutStringPrice			= int(''.join(filter(str.isdigit, parenPrice.text)))
	print("giá sản phẩm: " + str(cutStringPrice))

	parenOption				= soupDetail.find('table', class_="variations")
	trs 						= parenOption.select("tr td")
	trss 						= trs[1]
	trsss 					= trss.select("div.attribute-swatch div.swatchinput label.wcvasquare")
	# td div.attribute-swatch div.swatchinput label.wcvaswatchlabel 
	# print("chi la tmp: " + str(len(trsss)))
	for imgColor in trsss :
		# print("option color: " + str(imgColor["style"]))
		style = cssutils.parseStyle(imgColor["style"])
		url = style['background-image']
		url = url.replace('url(', '').replace(')', '') 
		print("url: " +str(url))
		
	trss1 					= trs[3]
	trsss1					= trss1.select("div.attribute-swatch div.swatchinput label.wcvasquare")
	for size in trsss1 :
		# break
		print("option size: " + str(size.text))
		
	print("--------------------------------------------")
 