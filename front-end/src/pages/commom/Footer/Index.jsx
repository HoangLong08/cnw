import React from 'react'

import {Col, Row} from 'antd'

import '../Footer/style.css'

function Index() {
	return (
		<>
			<footer>
				<Row gutter={[16, 16]}>
					<Col md={6} sm={24} xs={24}>
						<ul className="footer-list-top">
							<li>
								<p className="footer-list-header">HỖ TRỢ KHÁCH HÀNG</p></li>
								<li>
								<a href='/shop/about-contact' className="generic-anchor footer-list-anchor" >Các câu hỏi thường gặp
								</a>
							</li>
							<li>
								<a href='/faq.html' className="generic-anchor footer-list-anchor" >
									Gửi yêu cầu hỗ trợ
								</a>
							</li>
							<li>
								<a href='/shop/store-locator' className="generic-anchor footer-list-anchor" >
									Hướng dẫn đặt hàng
								</a>
							</li>
							<li>
								<a href='/shop/user-registration?URL=' className="generic-anchor footer-list-anchor" >
									Phương thức vận chuyển
								</a>
							</li>
							<li>
								<a href='/shop/order-status' className="generic-anchor footer-list-anchor">
									Chính sách đổi trả

								</a>
							</li>
							<li>
								<a href='/shop/order-status' className="generic-anchor footer-list-anchor">
								Chính sách hàng nhập khẩu

								</a>
							</li>
							<li>
								<a href='/shop/order-status' className="generic-anchor footer-list-anchor">
								Hỗ trợ khách hàng: hotro@tiki.vn

								</a>
							</li>
							<li>
								<a href='/shop/order-status' className="generic-anchor footer-list-anchor">
									Báo lỗi bảo mật: security@tiki.vn

								</a>
							</li>


						</ul>
					</Col>
				
					<Col md={6} sm={24} xs={24}>
					<ul className="footer-list-top">
						<li>
							<p className="footer-list-header">VỀ XSHOP</p>
						</li>
						<li><a href='/Angels/cat/id/70' className="generic-anchor footer-list-anchor">Giới thiệu lion</a></li>
						<li><a href='/Home-Decor/cat/id/64' className="generic-anchor footer-list-anchor">Tuyển dụng</a></li>
						<li><a href='/Mugs/cat/id/32' className="generic-anchor footer-list-anchor">Chính sách bảo mật thanh toán</a></li>
						<li><a href='/Pet-Lover/cat/id/108' className="generic-anchor footer-list-anchor">Điều khoản sử dụng</a></li>
						<li><a href='/Ladies-Accessories/cat/id/117' className="generic-anchor footer-list-anchor" target="_blank">Bán hàng doanh nghiệp</a></li>
					</ul>
					
					</Col>
					<Col  md={6} sm={24} xs={24}>
						<ul className="footer-list-top">
							<li >
								<p className="footer-list-header">PHƯƠNG THỨC THANH TOÁN</p></li>
							<li>
								<Row >
									<Col md={8}>
										<img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/visa.svg" alt="hihi"/>
										<img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/jcb.svg" alt="hihi"/>
									</Col>
									<Col md={8}>
										<img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/mastercard.svg" alt="hihi"/>
										
										<img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/installment.svg" alt="hihi"/>
									</Col>
									<Col md={8}>
										<img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/cash.svg" alt="hihi"/>
										<img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/internet-banking.svg" alt="hihi"/>
										
									</Col>
								</Row>
							</li>
						</ul>
					</Col>
					<Col  md={6} sm={24} xs={24}>
						<ul className="footer-list-top">
							<li id='help'>
								<p className="footer-list-header">KẾT NỐI VỚI CHÚNG TÔI</p></li>
							<li><a href='/shop/about-contact' className="generic-anchor footer-list-anchor" >CONTACT</a></li>
							<li><a href='/faq.html' className="generic-anchor footer-list-anchor" >FAQ</a></li>
							<li id='find-a-store'><a href='/shop/store-locator' className="generic-anchor footer-list-anchor" >STORE LOCATOR</a></li>
							<li id='user-registration'><a href='/shop/user-registration?URL=' className="generic-anchor footer-list-anchor" >NEW USERS</a></li>
							<li id='order-tracking'><a href='/shop/order-status' className="generic-anchor footer-list-anchor">ORDER STATUS</a></li>
						</ul>
					</Col>
				</Row>
			</footer>	
		</>
	)
}

export default Index
