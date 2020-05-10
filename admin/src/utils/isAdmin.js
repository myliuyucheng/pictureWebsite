import Cookies from 'js-cookie'

const AdminKey = 'isAdmin'

export function getAdmin() {
  return Cookies.get(AdminKey)
}

export function setAdmin(isAdmin) {
  return Cookies.set(AdminKey, isAdmin)
}

export function removeAdmin() {
  return Cookies.remove(AdminKey)
}
