package com.ok.demo.services;

import java.io.Serializable;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

public interface RedisService {
    Object getObject(String key);
    <T> T get(String key);
    void remove(String key);
    void save(String key, Serializable object);
    void saveList(String key, List list);
    void putString(String key, String value);
    String getString(String key);
    void putExpired(String key, Serializable object, long timeout, TimeUnit unit);
    void putExpired(String key, List list, long timeout, TimeUnit unit);
    boolean hasKey(String key);
    Set<String> keys(String keyPattern);

    Long getTTL(String key);
}
