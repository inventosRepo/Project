require File.expand_path(File.dirname(__FILE__) + "/../../config/environment")

  namespace :db do
    desc "Delete old code"
      task(:destroyOldCode) do
        User.find_each do |user|
          if(user.creatingtime != nil)
            @user = Time.parse user.creatingtime
              if(@user + 600 < Time.now)
                user.code = nil;
                user.creatingtime = nil;
                user.save;
              end
          end
        end
      end
  end
