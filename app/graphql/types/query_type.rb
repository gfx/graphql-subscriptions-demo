class Types::QueryType < Types::BaseObject

  field :items, Types::ItemType.connection_type, null: false, resolve: -> (_object, _args, _context) {
    Item.order(id: :desc)
  }
end
