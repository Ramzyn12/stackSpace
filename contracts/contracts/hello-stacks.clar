(define-constant ERR-NOT-ENOUGH-FUNDS u405)
(define-constant ERR-INSUFFICIENT-SHARES u406)
(define-constant ERR-HOUSE-NOT-FOUND u407)

;; Define the house listing structure
(define-map house-listings
  {house-id: uint} 
  {
    price-per-share: uint,
    shares-available: uint,
    seller: principal
  }
)

;; Function to list a new house for sale by a seller
(define-public (list-house-for-sale (house-id uint) (price-per-share uint) (total-shares uint))
  (let ((seller tx-sender))
    (map-set house-listings 
      {house-id: house-id} 
      {
        price-per-share: price-per-share, 
        shares-available: total-shares, 
        seller: seller
      }
    )
    (ok true)
  )
)

;; Function to purchase shares of a house
(define-public (purchase-shares (house-id uint) (shares-to-buy uint))
  (let ((buyer tx-sender))
    (match (map-get? house-listings {house-id: house-id})
      house 
      (let ((total-cost (* shares-to-buy (get price-per-share house)))
            (shares-available (get shares-available house)))
        (if (< shares-available shares-to-buy)
          (err ERR-INSUFFICIENT-SHARES)  ;; Not enough shares available to fulfill the purchase
          (let ((transfer-result (stx-transfer? total-cost buyer (get seller house))))
            (if (is-eq (ok true) transfer-result)
              (begin
                ;; Update the house listing with the new number of shares available after the purchase.
                (map-set house-listings 
                  {house-id: house-id} 
                  {
                    price-per-share: (get price-per-share house), 
                    shares-available: (- shares-available shares-to-buy), 
                    seller: (get seller house)
                  }
                )
                (ok true)
              )
              (err ERR-NOT-ENOUGH-FUNDS)  ;; The buyer didn't have enough funds to complete the purchase
            )
          )
        )
      )
      ;; If the house isn't listed in the contract, it's a ZooplaAPI house. The buyer should lose funds equivalent to the purchase.
      ;; For simplicity, we're assuming a fixed cost per share when buying from the ZooplaAPI.
      (let ((total-cost (* shares-to-buy u1000))) ;; Fixed cost for ZooplaAPI houses, for example
        (let ((transfer-result (stx-transfer? total-cost buyer 'ST2ST2H80NP5C9SPR4ENJ1Z9CDM9PKAJVPYWPQZ50))) ;; Transferring to a burn address or platform address
          (if (is-eq (ok true) transfer-result)
            (ok true)
            (err ERR-NOT-ENOUGH-FUNDS)
          )
        )
      )
    )
  )
)

(define-read-only (get-house-details (house-id uint))
  (map-get? house-listings {house-id: house-id})
)

;; Additional functions like `get-balance` and `get-house-details` can remain in your contract for querying balances and house details.