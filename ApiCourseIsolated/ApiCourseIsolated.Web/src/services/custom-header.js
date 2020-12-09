export default function customHeader() {
  const customContentType =   'application/json; charset=utf-8'; //'application/x-www-form-urlencoded'; //
  const customAccept= 'application/json, text/plain,*/*';
  const customAccessControlAllowOrigin= '*';

  return { 'Content-Type': customContentType, 'Accept': customAccept, 'Access-Control-Allow-Origin': customAccessControlAllowOrigin};
}
