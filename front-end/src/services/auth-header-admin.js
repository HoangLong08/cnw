export default function authHeaderAdmin() {
	const user = JSON.parse(sessionStorage.getItem('infoAdmin'));
	if (user && user.token) {
		return {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + user.token
		}
	} else {
		return {}
	}
}