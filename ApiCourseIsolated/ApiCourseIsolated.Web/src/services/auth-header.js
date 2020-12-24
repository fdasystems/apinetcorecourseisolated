export default function authHeader() {
  const customContentType =   'application/json; charset=utf-8'; //'application/x-www-form-urlencoded'; //
  const customAccept= 'application/json, text/plain,*/*';
  const customAccessControlAllowOrigin= '*';
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    //return { 'Content-Type': customContentType, 'Accept': customAccept, 'Access-Control-Allow-Origin': customAccessControlAllowOrigin, Authorization: user.token }; //Simple mode..
    //return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    //return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    return { Authorization: 'Bearer ' + user.token, 'Content-Type': customContentType, 'Accept': customAccept, 'Access-Control-Allow-Origin': customAccessControlAllowOrigin };
  } else {
    return {'Content-Type': customContentType, 'Accept': customAccept, 'Access-Control-Allow-Origin': customAccessControlAllowOrigin};
  }
}
