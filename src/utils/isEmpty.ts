export function isEmpty(str: string | undefined | null) {
  return str == undefined || str == null || str.length == 0 || str == "";
}
