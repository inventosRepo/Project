class Level < ActiveRecord::Base
  def self.select_level(level)
    case level
    when 1
      @lvl = Level.where(level: 1).take
      @map = @lvl.data
      when 2
        @lvl = Level.where(level: 1).take
        @map = @lvl.data
      end
    end
end
