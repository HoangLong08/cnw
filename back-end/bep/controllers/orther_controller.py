import re
from models.products_model import Product
from configdb.connectdb import connectdb
class OrtherController:
    def __init__(self) -> None:
        pass
    @staticmethod
    def getSupplier():
        sql = "SELECT * FROM `suppliers` ;"
        result = connectdb.executeQuery(sql)
        res = []
        for x in result:
            tmp  = {
                "id"    : x[0],
                "name"  : x[1],
            }
            res.append(tmp)
        return res
    @staticmethod
    def getCategory():
        sql = "SELECT * FROM `categores` ;"
        result = connectdb.executeQuery(sql)
        res = []
        for x in result:
            tmp  = {
                "id"    : x[0],
                "name"  : x[1],
            }
            res.append(tmp)
        return res
    @staticmethod
    def getStatusOrder():
        sql = "SELECT * FROM `statusorder` ;"
        result = connectdb.executeQuery(sql)
        res = []
        for x in result:
            tmp  = {
                "id"    : x[0],
                "name"  : x[1],
                "des"   : x[2]
            }
            res.append(tmp)
        return res
    @staticmethod
    def baseboard():
        sql1 = "SELECT * FROM `orderdetails` ;"
        result1 = connectdb.executeQuery(sql1)
        totalSale = 0
        for x in result1:
            totalSale = totalSale + int(x[4])
        sql2 = "SELECT COUNT(*) FROM orders ;"
        result2 = connectdb.executeQuery(sql2)
        totalOrder = result2[0][0]
        sql3 = "SELECT COUNT(*) FROM customers ;"
        result3 = connectdb.executeQuery(sql3)
        totalCustomer = result3[0][0]
        sql4 = "SELECT Sum(dt.total), cu.firstName, cu.lastName, cu.email FROM orders od INNER JOIN orderdetails dt ON dt.orderId = od.id INNER JOIN customers cu ON cu.id = od.customerId GROUP BY dt.orderId ORDER BY Sum(dt.total) DESC LIMIT 5 ;"
        result4 = connectdb.executeQuery(sql4)
        topCus = []
        for x in result4:
            cus = {
                "name"  : str(x[1])+str(" ")+str(x[2]),
                "email" : x[3],
                "sum"   : str(x[0])
            }
            topCus.append(cus)
        sql5 = "SELECT Sum(dt.proId), pr.proName , sup.name , pr.proPrice, pr.proSale FROM orders od INNER JOIN orderdetails dt ON dt.orderId = od.id INNER JOIN products pr ON pr.id = dt.proId INNER JOIN suppliers sup ON sup.id = pr.supplierId GROUP BY pr.proName , sup.name , pr.proPrice, pr.proSale ORDER BY Sum(dt.proId) DESC LIMIT 5 ;"
        result5 = connectdb.executeQuery(sql5)
        topPro = []
        for x in result5:
            pro = {
                "name"      : str(x[1]),
                "sup"       : str(x[2]),
                "price"     : str(x[3]),
                "sale"      : str(x[4])
            }
            topPro.append(pro)
        tmp = {
            "totalSale"     : totalSale,
            "totalOrder"    : totalOrder,
            "totalCustomer" : totalCustomer,
            "topCustomer"   : topCus,
            "topProduct"    : topPro
        }
        return tmp
        
