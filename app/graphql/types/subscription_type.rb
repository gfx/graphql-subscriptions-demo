class Types::SubscriptionType < GraphQL::Schema::Object
  field :value, Integer, null: true, resolve: -> (_object, _args, _context) {
    42
  }

  field :itemAdded, Types::ItemType, null: true, resolve: -> (_object, _args, _context) {
    puts "[XXX] itemAdded"
    Item.order(id: :desc).first # just a default
  }
end
