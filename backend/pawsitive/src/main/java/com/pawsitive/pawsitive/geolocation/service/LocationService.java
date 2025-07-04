package com.pawsitive.pawsitive.geolocation.service;

import com.pawsitive.pawsitive.geolocation.model.Location;

public interface LocationService<T extends Location> {
    void saveLocation(T location);
}
