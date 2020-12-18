enum RegExpression {
  ROOM_CODE = '^[A-Z|0-9]{4}$',
  NICKNAME = '^[A-Z|a-z|가-힣]{2,12}$',
  IMAGE_LINK = '^https://kr.object.ncloudstorage.com/pupago/.*.jpg$',
  RANGE = 'g',
}

export default RegExpression;
