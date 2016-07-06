class AddFieldToUsers < ActiveRecord::Migration
  def change
    add_column :users, :player_i, :integer, default: 1
  end
end
