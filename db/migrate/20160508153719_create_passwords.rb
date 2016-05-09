class CreatePasswords < ActiveRecord::Migration
  def change
    create_table :passwords do |t|
      t.string :email,              null: false, default: ""
      t.string :password,           null: false, default: ""
    end
  end
end
