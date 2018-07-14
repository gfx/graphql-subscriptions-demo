class Mutations::AddItemMutation < GraphQL::Schema::Mutation

  argument :content, String, required: true

  field :item, Types::ItemType, null: false

  def resolve(content:)
    item = Item.create!(content: content)
    AppSchema.subscriptions.trigger(:itemAdded, {}, item)

    {
        item: item
    }
  end
end
