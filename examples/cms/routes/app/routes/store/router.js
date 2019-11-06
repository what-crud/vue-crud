import Sections from './routes/sections/Index.vue'
import Products from './routes/products/Index.vue'
import TransactionProducts from './routes/transaction-products/Index.vue'
import Transactions from './routes/transactions/Index.vue'
import Customers from './routes/customers/Index.vue'

let storeRoutes = [
  {
    path: 'sections',
    name: 'store-sections',
    component: Sections,
  },
  {
    path: 'products',
    name: 'store-products',
    component: Products,
  },
  {
    path: 'transaction-products',
    name: 'store-transaction-products',
    component: TransactionProducts,
  },
  {
    path: 'transactions',
    name: 'store-transactions',
    component: Transactions,
  },
  {
    path: 'customers',
    name: 'store-customers',
    component: Customers,
  },
]

export default storeRoutes
