class AddContentsToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :content, :string, null: false, default: ""
  end
end
