-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization(
organization_id SERIAL PRIMARY KEY, 
name VARCHAR(150) NOT NULL,
description TEXT NOT NULL, 
contact_email VARCHAR(255) NOT NULL,
logo_filename VARCHAR(255) NOT NULL
);
-- ========================================
-- Sample Data
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
  ('BrightFuture Builders',
   'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
   'info@brightfuturebuilders.org',
   'brightfuture-logo.webp'),
  ('GreenHarvest Growers',
   'An urban farming collective promoting food sustainability and education in local neighborhoods.',
   'contact@greenharvest.org',
   'greenharvest-logo.webp'),
  ('UnityServe Volunteers',
   'A volunteer coordination group supporting local charities and service initiatives.',
   'hello@unityserve.org',
   'unityserve-logo.webp');

   -- ========================================
   -- Projects
   -- ========================================

   -- Create the service_project table
CREATE TABLE public.service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    date DATE,
    CONSTRAINT fk_organization FOREIGN KEY (organization_id) REFERENCES public.organization(organization_id)
);

-- Insert 5 projects for BrightFuture Builders (organization_id = 1)
INSERT INTO public.service_project (organization_id, title, description, location, date) VALUES
(1, 'Community Center Renovation', 'Renovating the local community center with sustainable materials.', 'Salt Lake City, UT', '2026-06-15'),
(1, 'Playground Build', 'Building a new playground for underprivileged neighborhoods.', 'Provo, UT', '2026-07-20'),
(1, 'School Roof Repair', 'Repairing the roof of an elementary school damaged by storms.', 'Ogden, UT', '2026-08-05'),
(1, 'Affordable Housing Framing', 'Helping frame new affordable housing units.', 'Boise, ID', '2026-09-10'),
(1, 'Park Pathway Construction', 'Constructing accessible pathways in a local park.', 'Logan, UT', '2026-10-01'),

-- Insert 5 projects for GreenHarvest Growers (organization_id = 2)
(2, 'Urban Garden Setup', 'Setting up a community urban garden in a food desert.', 'Salt Lake City, UT', '2026-06-01'),
(2, 'Composting Workshop', 'Teaching composting techniques to local residents.', 'Provo, UT', '2026-06-22'),
(2, 'School Garden Program', 'Creating gardens at local schools to teach kids about food.', 'Ogden, UT', '2026-07-15'),
(2, 'Farmers Market Launch', 'Organizing a neighborhood farmers market.', 'Boise, ID', '2026-08-20'),
(2, 'Harvest Food Drive', 'Collecting and distributing fresh produce to families in need.', 'Logan, UT', '2026-09-05'),

-- Insert 5 projects for UnityServe Volunteers (organization_id = 3)
(3, 'Food Bank Volunteer Day', 'Volunteering at the local food bank to sort and distribute food.', 'Salt Lake City, UT', '2026-06-10'),
(3, 'Elderly Care Visit', 'Visiting and assisting elderly residents in care homes.', 'Provo, UT', '2026-07-04'),
(3, 'Clothing Drive', 'Collecting and distributing clothing to homeless shelters.', 'Ogden, UT', '2026-07-25'),
(3, 'Literacy Program', 'Teaching reading and writing skills to adults in need.', 'Boise, ID', '2026-08-15'),
(3, 'Animal Shelter Help', 'Helping care for animals at the local shelter.', 'Logan, UT', '2026-09-20');


-- ========================================
-- Categories
-- ========================================

-- Create categories table
CREATE TABLE public.category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create junction table for projects and categories
CREATE TABLE public.project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES public.service_project(project_id),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.category(category_id)
);

-- Insert categories
INSERT INTO public.category (name) VALUES
('Construction & Renovation'),
('Environment & Sustainability'),
('Food & Nutrition'),
('Education & Literacy'),
('Community Support');

-- Associate projects with categories
INSERT INTO public.project_category (project_id, category_id) VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1),
(6, 2), (7, 2), (8, 3), (9, 3), (10, 3),
(11, 5), (12, 5), (13, 5), (14, 4), (15, 5);