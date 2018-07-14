class Types::ItemType < Types::BaseObject
  description 'item'

  field :content, String, null: false

  field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  field :created_at, GraphQL::Types::ISO8601DateTime, null: false
end
