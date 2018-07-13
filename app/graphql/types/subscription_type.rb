class Types::SubscriptionType < GraphQL::Schema::Object
  field :value, Integer, null: false, resolve: -> (_object, _args, _context) {
    42
  }
end
