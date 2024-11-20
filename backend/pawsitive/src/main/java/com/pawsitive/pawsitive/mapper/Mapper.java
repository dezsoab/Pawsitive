package com.pawsitive.pawsitive.mapper;

/**
 * A generic interface for mapping between entities and DTOs.
 *
 * @param <E> the entity type
 * @param <D> the DTO type
 */
public interface Mapper<E, D> {

    D toDto(E entity);

    E toEntity(D dto);
}
