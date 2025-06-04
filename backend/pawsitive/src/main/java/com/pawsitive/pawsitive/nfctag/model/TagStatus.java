package com.pawsitive.pawsitive.nfctag.model;

public enum TagStatus {
    AVAILABLE, // Free to be written to new NFC
    CLAIMED, // has been registered to a pet
    UNCLAIMED // has been written to NFC tag but not yet claimed
}
