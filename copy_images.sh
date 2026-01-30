#!/bin/bash
ARTIFACTS_DIR="/Users/tindang/.gemini/antigravity/brain/13be7f14-4a96-40a1-a678-3638f1a00a38"
DEST_DIR="/Users/tindang/workspaces/tind-repo/luxury-real-estate-nextjs/public/assets/images/amenities"

mkdir -p "$DEST_DIR"

cp "$ARTIFACTS_DIR/canal_2km_global_city_1769704109392_webp_1769735826871.png" "$DEST_DIR/canal_2km.png"
cp "$ARTIFACTS_DIR/park_13ha_global_city_1769704109393_webp_1769735844790.png" "$DEST_DIR/park_13ha.png"
cp "$ARTIFACTS_DIR/mall_125000m2_global_city_1769704109394_webp_1769736028066.png" "$DEST_DIR/mall_125000m2.png"
cp "$ARTIFACTS_DIR/intl_school_global_city_1769704109395_webp_1769735861476.png" "$DEST_DIR/intl_school.png"
cp "$ARTIFACTS_DIR/infinity_pool_global_city_1769704109396_webp_1769735876663.png" "$DEST_DIR/infinity_pool.png"
cp "$ARTIFACTS_DIR/clubhouse_gym_global_city_1769704109397_webp_1769735891887.png" "$DEST_DIR/clubhouse_gym.png"
cp "$ARTIFACTS_DIR/fb_global_city_1769704109398_webp_1769735915703.png" "$DEST_DIR/fb_street.png"
cp "$ARTIFACTS_DIR/kids_playground_global_city_1769704109399_webp_1769735933898.png" "$DEST_DIR/kids_playground.png"
cp "$ARTIFACTS_DIR/city_park_sports_global_city_1769704109400_webp_1769735949147.png" "$DEST_DIR/city_park.png"
cp "$ARTIFACTS_DIR/hospital_global_city_1769704109401_webp_1769735972374.png" "$DEST_DIR/hospital.png"
cp "$ARTIFACTS_DIR/cultural_center_global_city_1769704109402_webp_1769735988825.png" "$DEST_DIR/cultural_center.png"
cp "$ARTIFACTS_DIR/security_system_global_city_1769704109403_webp_1769736005777.png" "$DEST_DIR/security_system.png"

echo "Copy complete. Files in $DEST_DIR:"
ls -la "$DEST_DIR"
