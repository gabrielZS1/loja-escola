# Modelo de Dados

User
- id
- nome
- email
- senha

Product
- id
- nome
- descricao
- preco
- estoque

Order
- id
- user_id
- total

OrderItem
- id
- order_id
- product_id
- quantidade