def calculate_cropping_region(selected_squares, grid_size, image_dimensions):
    print("calculate_cropping_region")
    print("selected_squares:", selected_squares)
    print("grid_size:", grid_size)
    print("image_dimensions:", image_dimensions)
    
    img_width, img_height = image_dimensions
    cell_height = 1 / grid_size[0]
    cell_width = 1 / grid_size[1]
    
    
    print("img_width:", img_width)
    
    cols = []
    rows = []
    
    for square in selected_squares:
        row = square // grid_size[0]
        col = square % grid_size[0]
        
        cols.append(col)
        rows.append(row)

    
    min_col = min(cols)
    max_col = max(cols)
    min_row = min(rows)
    max_row = max(rows)
    
    left = int(min_col * cell_width * img_width)
    right = int((max_col + 1) * cell_width * img_width)
    top = int(min_row * cell_height * img_height)
    bottom = int((max_row + 1) * cell_height * img_height)
    
    print("left:", left)
    print("right:", right)
    print("top:", top)
    print("bottom:", bottom)
    
    return (left, top, right, bottom)

