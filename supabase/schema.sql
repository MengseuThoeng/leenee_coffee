-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_km TEXT,
  description TEXT NOT NULL,
  description_km TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  hot BOOLEAN DEFAULT false,
  iced BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read menu items
CREATE POLICY "Anyone can view menu items"
  ON menu_items
  FOR SELECT
  TO public
  USING (true);

-- Policy: Only authenticated users can insert
CREATE POLICY "Authenticated users can insert menu items"
  ON menu_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can update
CREATE POLICY "Authenticated users can update menu items"
  ON menu_items
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can delete
CREATE POLICY "Authenticated users can delete menu items"
  ON menu_items
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for category filtering
CREATE INDEX idx_menu_items_category ON menu_items(category);

-- Create a function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_menu_items_updated_at 
  BEFORE UPDATE ON menu_items 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO menu_items (name, description, price, category, image, hot, iced) VALUES
('Espresso', 'Rich and bold single shot of pure espresso', 3.50, 'Espresso', 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop', true, false),
('Americano', 'Espresso diluted with hot water for a smooth finish', 4.00, 'Espresso', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop', true, true),
('Cappuccino', 'Espresso with steamed milk and a thick layer of foam', 4.50, 'Espresso', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop', true, false),
('Latte', 'Smooth espresso with steamed milk and light foam', 4.75, 'Espresso', 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600&auto=format&fit=crop', true, true),
('Flat White', 'Double shot espresso with velvety microfoam', 5.00, 'Espresso', 'https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?w=600&auto=format&fit=crop', true, false),
('Mocha', 'Rich chocolate and espresso with steamed milk', 5.25, 'Espresso', 'https://images.unsplash.com/photo-1607681034540-2c46cc71896d?w=600&auto=format&fit=crop', true, true),
('Drip Coffee', 'Freshly brewed classic coffee', 3.00, 'Coffee', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop', true, false),
('Cold Brew', 'Smooth, slow-steeped cold coffee concentrate', 4.50, 'Coffee', 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=600&auto=format&fit=crop', false, true),
('Pour Over', 'Hand-crafted single origin coffee', 5.50, 'Coffee', 'https://images.unsplash.com/photo-1545665225-b23b99e4d45e?w=600&auto=format&fit=crop', true, false),
('Green Tea', 'Delicate and refreshing Japanese green tea', 3.50, 'Tea', 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cda9?w=600&auto=format&fit=crop', true, true),
('Chai Latte', 'Spiced black tea with steamed milk', 4.75, 'Tea', 'https://images.unsplash.com/photo-1578899952107-9d9d94d0c87b?w=600&auto=format&fit=crop', true, true),
('Earl Grey', 'Classic black tea with bergamot', 3.50, 'Tea', 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop', true, false),
('Caramel Macchiato', 'Vanilla-flavored latte with caramel drizzle', 5.50, 'Specialty', 'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?w=600&auto=format&fit=crop', true, true),
('Vanilla Latte', 'Classic latte with sweet vanilla syrup', 5.00, 'Specialty', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&auto=format&fit=crop', true, true),
('Hazelnut Latte', 'Creamy latte with hazelnut flavor', 5.00, 'Specialty', 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop', true, true),
('Croissant', 'Buttery, flaky French pastry', 3.75, 'Pastries', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop', false, false),
('Blueberry Muffin', 'Moist muffin packed with fresh blueberries', 4.00, 'Pastries', 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&auto=format&fit=crop', false, false),
('Chocolate Croissant', 'Flaky croissant filled with rich chocolate', 4.25, 'Pastries', 'https://images.unsplash.com/photo-1590080876351-cd8b40348f0e?w=600&auto=format&fit=crop', false, false),
('Cinnamon Roll', 'Warm, gooey cinnamon roll with cream cheese frosting', 4.50, 'Pastries', 'https://images.unsplash.com/photo-1582047300975-0fa23b1c9097?w=600&auto=format&fit=crop', false, false),
('Banana Bread', 'Homemade banana bread, moist and delicious', 3.50, 'Pastries', 'https://images.unsplash.com/photo-1589193608669-e0d4e4d9e8ce?w=600&auto=format&fit=crop', false, false);
