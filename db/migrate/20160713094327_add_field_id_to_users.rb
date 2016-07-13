class AddFieldIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :field_id, :string
  end
end
