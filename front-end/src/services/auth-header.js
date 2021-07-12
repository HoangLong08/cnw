export default function authHeader() {
	const user = JSON.parse(sessionStorage.getItem('infoUser'));
	if (user && user.token) {
		return {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + user.token
		}
	} else {
		return {}
	}
}