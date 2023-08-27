def calculate_cropping_region(selected_squares, grid_size, image_dimensions):
    print("calculate_cropping_region")
    print("selected_squares:", selected_squares)
    print("grid_size:", grid_size)
    print("image_dimensions:", image_dimensions)
    
    img_width, img_height = image_dimensions
    cell_height = img_height / grid_size[0]
    cell_width = img_width / grid_size[1]
    
    # Get the coordinates of the first selected square
    # each square is an index in the grid.
    # we need to convert the index to a coordinate
    # in the image.
    
    # For each square, convert the index to a coordinate
    # Find the minimum and maximum x and y coordinates
    # Return the cropping region
    left = 0
    upper = 0
    right = 0
    lower = 0
    
    for square_index in selected_squares:
        # Convert the square index to a coordinate
        square_x = square_index % grid_size[1]
        square_y = square_index // grid_size[1]
        
        # Convert the square coordinate to a cropping region
        square_left = square_x * cell_width
        square_upper = square_y * cell_height
        square_right = square_left + cell_width
        square_lower = square_upper + cell_height
        
        # Update the cropping region
        if left == 0 or square_left < left:
            left = square_left
        if upper == 0 or square_upper < upper:
            upper = square_upper
        if right == 0 or square_right > right:
            right = square_right
        if lower == 0 or square_lower > lower:
            lower = square_lower
            
        # Add a 5px buffer to the cropping region
        buffer = 5
        left -= buffer
        upper -= buffer
        right += buffer
        lower += buffer
            
    return (left, upper, right, lower)
