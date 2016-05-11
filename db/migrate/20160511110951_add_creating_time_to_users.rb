class AddCreatingTimeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :creatingtime, :timestamp
  end
end
