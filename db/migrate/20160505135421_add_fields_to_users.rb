class AddFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :code, :string
    add_column :users, :player_x, :integer, default: 0
    add_column :users, :player_y, :integer, default: 0
  end
end
