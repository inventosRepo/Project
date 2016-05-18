class AddPlayersidToUsers < ActiveRecord::Migration
  def change
      add_column :users, :playersid, :string
  end
end
